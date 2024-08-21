using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Tair.Api.Controllers;
using Tair.Api.ViewModels;
using Tair.Domain.Entities;
using Tair.Domain.Entities.Base;
using Tair.Domain.Interfaces;

namespace Tair.Api.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/stripe")]
    public class StripeController : MainController
    {
        #region VARIABLES
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUser _user;
        private readonly IMapper _mapper;
        private readonly IReservasService _reservasService;
        private readonly IReservasRepository _reservasRepository;
        #endregion

        #region CONSTRUCTOR
        public StripeController(IConfiguration configuration,
                                UserManager<ApplicationUser> userManager,
                                IReservasService reservasService,
                                IReservasRepository reservasRepository,
                                IMapper mapper,
                                INotificador notificador, IUser user) : base(notificador, user, configuration)
        {
            _mapper = mapper;
            _userManager = userManager;
            _reservasService = reservasService;
            _reservasRepository = reservasRepository;
            _user = user;
        }
        #endregion

        #region CLIENTES
        [HttpPost("create-customer")]
        public ActionResult CreateCustomer(CustomerCreateViewModel customer)
        {
            var customerToAdd = new CustomerCreateOptions()
            {
                Name = customer.Name,
                Email = customer.Email,
                Address = new AddressOptions() { 
                    City = customer.Address.City,
                    State = customer.Address.State,
                    PostalCode = customer.Address.PostalCode,
                    Line2 = customer.Address.Line2,
                    Line1 = customer.Address.Line1,
                    Country = customer.Address.Country
                }
            };

            var service = new CustomerService();
            try
            {
                var customer_stripe_id = service.Create(customerToAdd);
                return CustomResponse(customer_stripe_id.Id);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }

        [HttpDelete("delete-customer")]
        public ActionResult DeleteCustomer(string customerId)
        {
            var service = new CustomerService();
            try
            {
                var result = service.Delete(customerId);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }

        [HttpGet("list_all_customers")]
        public ActionResult ListAllCustomer(int limit)
        {
            var options = new CustomerListOptions { Limit = limit };
            var service = new CustomerService();

            try
            {
                StripeList<Customer> customers = service.List(options);
                return CustomResponse(customers);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }

        [HttpGet("list_customer_by_id")]
        public ActionResult ListByIdCustomer(string customerId)
        {
            var service = new CustomerService();

            try
            {
                var customer = service.Get(customerId);
                return CustomResponse(customer);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }
        #endregion

        #region MÉTODO DE PAGAMENTO
        [HttpPost("create-payment-method")]
        public ActionResult CreatePaymentMethod(PaymentMethodCreateViewModel paymentMethod)
        {
            var paymentToAdd = new PaymentMethodCreateOptions
            {
                Type = "card",
                Card = new PaymentMethodCardOptions
                {
                    Number = paymentMethod.card.number,
                    ExpMonth = paymentMethod.card.ExpMonth,
                    ExpYear = paymentMethod.card.ExpYear,
                    Cvc = paymentMethod.card.Cvc
                },
            };
            var service = new PaymentMethodService();

            try
            {
                var result = service.Create(paymentToAdd);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }
        #endregion

        #region PAGAMENTOS
        [HttpPost("create-payment_intent")]
        [Authorize]
        public ActionResult CreatePaymentIntent(PaymentIntentCreateViewModel payment_details)
        {
            var payment = new PaymentIntentCreateOptions
            {
                Amount = payment_details.Amount,
                Currency = payment_details.Currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = payment_details.AutomaticPaymentMethods.Enabled,
                },
            };
            var service = new PaymentIntentService();

            try
            {
                var result = service.Create(payment);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                return CustomResponse();
            }

        }

        [HttpPost("create-session")]
        [Authorize]
        public async Task<ActionResult> CreateSession(CreateSessionViewModel session) 
        {
            var diaMinimoReserva = DateTime.UtcNow;
            var sessionCorrigida = new DateTime(session.DataEscolhida.Year, session.DataEscolhida.Month, session.DataEscolhida.Day, 0,0,0);
            var dataMinimaCorrigida = new DateTime(diaMinimoReserva.Year, diaMinimoReserva.Month, diaMinimoReserva.Day, 0,0,0);

            TimeSpan ts = sessionCorrigida - dataMinimaCorrigida;

            if (ts.Days < 1)
            {
                NotificarErro("O agendamento deve ser para no mínimo o dia seguinte.");
                return CustomResponse();
            }

            var user = await _userManager.FindByIdAsync(_user.GetUserId().ToString());
            var domain = "http://localhost:4200/";
            var identificador = Guid.NewGuid(); //Usado pra identificar quando chegar o webhook de charge

            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = "price_1Pn3PZ1yuM9jpCt54O37vqn2",
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = domain + "voos/minhas-reservas",
                CancelUrl = domain + "voos/" + session.VooIdToReturn,
                CustomerEmail = user.Email,
                PaymentIntentData = new SessionPaymentIntentDataOptions() { Metadata = new Dictionary<string, string> { { "Identificador_DB", identificador.ToString() } } }
            };

            var service = new SessionService();

            try
            {
                Session createSession = service.Create(options);
                Response.Headers.Add("Location", createSession.Url);

                //Criar a reserva
                var reservaViewModel = new ReservasEditViewModel()
                {
                    ChargeId = "",
                    DataVoo = session.DataEscolhida,
                    ChargeStatus = "Session Initiate - Unpaid",
                    Identificador = identificador.ToString(),
                    TransactionId = "",
                    VooId = new Guid(session.VooIdToReturn),
                    UsuarioId = new Guid(user.Id)
                };

                var reservaToAdd = _mapper.Map<Reservas>(reservaViewModel);

                var resultAddingReserva = await _reservasService.Adicionar(reservaToAdd);

                return CustomResponse(createSession.Url);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                throw;
            }

        }

        [HttpGet("list-prices")]
        public ActionResult ListAllPrices()
        {
            var options = new PriceListOptions { Limit = 4 };
            var service = new PriceService();

            try
            {
                StripeList<Price> prices = service.List(options);
                return CustomResponse(prices);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                throw;
            }

        }

        [HttpPost("refund-charge/{reservaId}")]
        public async Task<ActionResult> RefundCharge(Guid reservaId)
        {
            var user = await _userManager.FindByIdAsync(_user.GetUserId().ToString());
            var reserva = await _reservasRepository.GetByIdAsync(reservaId);

            if (reserva.UsuarioId.ToString() != user.Id)
            {
                NotificarErro("Only the owner of the schedule is able to cancel it.");
                return CustomResponse();
            }
            
            var options = new RefundCreateOptions { Charge = reserva.ChargeId, Amount = 30000 };
            var service = new RefundService();

            try
            {
                var result = service.Create(options);
                return CustomResponse(result);
            }
            catch (Exception ex)
            {
                NotificarErro("Erro: " + ex);
                throw;
            }

        }
        #endregion

        #region WEBHOOKS
        [HttpPost("webhook")]
        public async Task<IActionResult> ChargeWebhook()
        {
            const string endpointSecret = "whsec_zK8b19qaaBYXYrqGYpyQ5zz9xJ8x0CJQ";

            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var charge = JsonConvert.DeserializeObject<ChargeWebhookViewModel>(json);

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret);

                // Charge com sucesso
                if (stripeEvent.Type == Events.ChargeUpdated)
                {
                    // SE ESTIVER PAGO
                    if (charge.Data.Object.paid)
                    {
                        // Pegar a reserva pelo identificador
                        var reserva = await _reservasRepository.ObterReservaPeloIdentificadord(charge.Data.Object.metadata.Identificador_DB);
                        reserva.TransactionId = charge.Data.Object.balance_transaction;
                        reserva.ChargeStatus = "Charge Succeeded";
                        reserva.ChargeId = charge.Data.Object.Id;
                        reserva.ErrorMessage = charge.Data.Object.outcome.seller_message;

                        // Atualizar
                        var resultUpdateReserva = await _reservasService.Atualizar(reserva);
                        if (!resultUpdateReserva)
                        {
                            NotificarErro("Error updating reserva.");
                            return CustomResponse();
                        }
                    }
                }
                // Charge com falha
                else if (stripeEvent.Type == Events.ChargeFailed)
                {
                    // Pegar a reserva pelo identificador
                    var reserva = await _reservasRepository.ObterReservaPeloIdentificadord(charge.Data.Object.metadata.Identificador_DB);
                    reserva.TransactionId = charge.Data.Object.balance_transaction;
                    reserva.ChargeStatus = "Charge Failed";
                    reserva.ChargeId = charge.Data.Object.Id;
                    reserva.ErrorMessage = charge.Data.Object.outcome.seller_message;

                    // Atualizar
                    var resultUpdateReserva = await _reservasService.Atualizar(reserva);
                    if (!resultUpdateReserva)
                    {
                        NotificarErro("Error updating reserva.");
                        return CustomResponse();
                    }
                }
                // Charge pendente
                else if (stripeEvent.Type == Events.ChargePending)
                {
                    // Pegar a reserva pelo identificador
                    var reserva = await _reservasRepository.ObterReservaPeloIdentificadord(charge.Data.Object.metadata.Identificador_DB);
                    reserva.TransactionId = charge.Data.Object.balance_transaction;
                    reserva.ChargeStatus = "Charge Pending";
                    reserva.ChargeId = charge.Data.Object.Id;
                    reserva.ErrorMessage = charge.Data.Object.outcome.seller_message;

                    // Atualizar
                    var resultUpdateReserva = await _reservasService.Atualizar(reserva);
                    if (!resultUpdateReserva)
                    {
                        NotificarErro("Error updating reserva.");
                        return CustomResponse();
                    }
                }
                else if (stripeEvent.Type == Events.ChargeRefunded)
                {
                    // Pegar a reserva pelo identificador
                    var reserva = await _reservasRepository.ObterReservaPeloIdentificadord(charge.Data.Object.metadata.Identificador_DB);
                    reserva.TransactionId = charge.Data.Object.balance_transaction;
                    reserva.ChargeStatus = "Charge Refunded";
                    reserva.ChargeId = charge.Data.Object.Id;
                    reserva.ErrorMessage = charge.Data.Object.outcome.seller_message;

                    // Atualizar
                    var resultUpdateReserva = await _reservasService.Atualizar(reserva);
                    if (!resultUpdateReserva)
                    {
                        NotificarErro("Error updating reserva.");
                        return CustomResponse();
                    }
                }

                return Ok();
            }
            catch (StripeException e)
            {
                NotificarErro("Error: " + e);
                return CustomResponse();
            }
        }
        #endregion
    }
}