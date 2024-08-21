using System.Collections.Generic;

namespace Tair.Domain.Helpers
{
    public class PagedResult<T> where T : class
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public List<T> Data { get; set; }
    }
}
