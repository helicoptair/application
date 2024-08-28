export class LocalStorageUtils {
    public salvarUsuarioSession(user: string) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('user', JSON.stringify(user));
        }
    }

    public salvarTokenUsuarioSession(token: string) {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', token);
        }
    }

    public obterTokenUsuarioSession(): string | null {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('token');
        }
        return null;
    }

    public obterUsuarioSession() {
        if (typeof window !== 'undefined') {
            return JSON.parse(sessionStorage.getItem('user')!);
        }
        return null;
    }

    public obterUsuarioIdSession() {
        if (typeof window !== 'undefined') {
            return JSON.parse(sessionStorage.getItem('user.id')!);
        }
        return null;
    }

    public salvarDadosLocaisUsuarioSession(response: any) {
        this.salvarTokenUsuarioSession(response.accessToken);
        this.salvarUsuarioSession(response.userToken);
    }

    public limparDadosLocaisUsuarioSession() {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
        }
    }
}
