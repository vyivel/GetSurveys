from knox.auth import TokenAuthentication


class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        name = "auth_token"
        token = request.COOKIES.get(name)
        if token:
            return self.authenticate_credentials(token.encode())
