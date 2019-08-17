from django.test import TestCase
from accounts.api import RegisterApi
from rest_framework.request import Request
from django.http import HttpRequest
from django.contrib.auth.models import User

class RegisterApiTests(TestCase):
    def setUp(self):
        self.request_data = {"username": "Bob", "password": "bob_password", "email": "bob@gmail.com"}
        self.register_url = "/api/auth/register"

    def test_registerGivesStatusOk(self):
        response = self.client.post(self.register_url, self.request_data)
        self.assertEqual(response.status_code, 200) #TODO: should be status 201?

    def test_newUserIsCreatedAfterRegistration(self):
        self.assertEqual(User.objects.all().count(), 0)
        self.client.post(self.register_url, self.request_data)
        self.assertEqual(User.objects.all().count(), 1)
        
        created_user_object = User.objects.first()
        self.assertEqual(created_user_object.username, self.request_data["username"])
        self.assertEqual(created_user_object.email, self.request_data["email"])
    
    def test_successfulRegistrationGivesResponseWithUsernameAndEmailFromRequest(self):
        response = self.client.post(self.register_url, self.request_data)
        self.assertEqual(response.data["user"]["username"], self.request_data["username"])
        self.assertEqual(response.data["user"]["email"], self.request_data["email"])
    
    def test_passwordFromRequestIsEncodedInResponse(self):
        response = self.client.post(self.register_url, self.request_data)
        self.assertNotEqual(response.data["user"]["password"], self.request_data["password"])


class LoginApiTests(TestCase):
    def setUp(self):
        self.request_data = {"username": "Bob", "password": "bob_password"}
        self.login_url = "/api/auth/login"
        User.objects.create_user(username = self.request_data["username"], email = "bob@gmail.com", password = self.request_data["password"])

    def test_successfulLoginGivesUsernameAndTokenInResponse(self):
        response = self.client.post(self.login_url, self.request_data)
        self.assertEqual(response.data["user"]["username"], self.request_data["username"])
        self.assertIn("token", response.data)


class UserApiAuthenticatedUsersTests(TestCase):
    def setUp(self):
        self.request_data = {}
        self.user_url = "/api/auth/user"
        User.objects.create_user(username = "Bob", email = "bob@gmail.com", password = "bob_password")
        self.loginUser()
    
    def loginUser(self):
        request_data = {"username": "Bob", "password": "bob_password"}
        login_url = "/api/auth/login"
        response = self.client.post(login_url, request_data)
        self.token = response.data["token"]
        self.request_data["headers"] = {}
        self.request_data["headers"]["Authorization"] = "Token " + self.token
        # print(self.request_data)
        # print(response.data)
    
    def test_getUser(self):  #TODO
        response = self.client.get(self.user_url, self.request_data)
        # print(response.data)
