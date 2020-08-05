export class LocalStorageUtils {
    
    public getUser() {
        return JSON.parse(localStorage.getItem('petnote.user'));
    }
            
    public saveUserLocalData(response: any) {
        this.saveUserToken(response.accessToken);
        this.saveUser(response.userToken);
    }
            
    public cleanUserLocalData() {
        localStorage.removeItem('petnote.token');
        localStorage.removeItem('petnote.user');
    }
        
    public getUserToken(): string {
        return localStorage.getItem('petnote.token');
    }
        
    public saveUserToken(token: string) {
        localStorage.setItem('petnote.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('petnote.user', JSON.stringify(user));
    }

}