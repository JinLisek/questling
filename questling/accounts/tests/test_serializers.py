from django.test import TestCase
from django.db.utils import IntegrityError
from accounts.serializers import RegisterSerializer, User


def get_num_of_created_users():
    return User.objects.all().count()


class RegisterSerializerTests(TestCase):
    def setUp(self):
        self.user = {"username": "Bob", "email": "bob@gmail.com", "password": "bob123"}
        self.second_user = {
            "username": "John",
            "email": "john@gmail.com",
            "password": "john456",
        }

    def test_that_users_are_empty_before_create(self):
        self.assertEqual(get_num_of_created_users(), 0)

    def test_that_create_adds_new_user(self):
        RegisterSerializer().create(self.user)
        self.assertEqual(get_num_of_created_users(), 1)

    def test_that_create_can_add_multiple_users(self):
        RegisterSerializer().create(self.user)
        RegisterSerializer().create(self.second_user)

        self.assertEqual(get_num_of_created_users(), 2)

    def test_that_created_user_is_instance_of_user_class(self):
        returned_user_object = RegisterSerializer().create(self.user)
        created_user_object = User.objects.first()

        self.assertTrue(isinstance(returned_user_object, User))
        self.assertTrue(isinstance(created_user_object, User))

    def test_that_create_adds_user_with_given_username(self):
        returned_user_object = RegisterSerializer().create(self.user)
        created_user_object = User.objects.first()

        self.assertEqual(returned_user_object.username, self.user["username"])
        self.assertEqual(returned_user_object.username, created_user_object.username)

    def test_that_create_adds_user_with_given_email(self):
        returned_user_object = RegisterSerializer().create(self.user)
        created_user_object = User.objects.first()

        self.assertEqual(returned_user_object.email, self.user["email"])
        self.assertEqual(returned_user_object.email, created_user_object.email)

    def test_that_create_user_has_same_password_as_returned(self):
        returned_user_object = RegisterSerializer().create(self.user)
        created_user_object = User.objects.first()

        self.assertEqual(returned_user_object.password, created_user_object.password)

    def test_that_create_throws_exception_when_duplicate_username_is_given(self):
        self.second_user["username"] = self.user["username"]
        RegisterSerializer().create(self.user)
        with self.assertRaises(IntegrityError):
            RegisterSerializer().create(self.second_user)

    # TODO: add email as unique
    # def test_that_create_throws_exception_when_duplicate_email_is_given(self):
    #     self.second_user["email"] = self.user["email"]
    #     RegisterSerializer().create(self.user)
    #     with self.assertRaises(IntegrityError):
    #         RegisterSerializer().create(self.second_user)

