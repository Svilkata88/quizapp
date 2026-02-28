from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from .models import User


class UserAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register_user')
        self.login_url = reverse('login_user')

    def test_register_user_success(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'strongpass',
            'password2': 'strongpass',
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())
        self.assertIn('seed', response.json())
        self.assertIn('user', response.json())
        self.assertTrue(User.objects.filter(username='testuser').exists())
        # cookie should be set
        self.assertIn('refresh', response.cookies)

    def test_register_user_password_mismatch(self):
        data = {
            'username': 'testuser2',
            'email': 'test2@example.com',
            'password': 'abc',
            'password2': 'def',
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('non_field_errors', response.json() or {})

    def test_login_user_success(self):
        user = User.objects.create_user(username='loginuser', password='mypassword')
        data = {'username': 'loginuser', 'password': 'mypassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access', response.json())
        self.assertIn('seed', response.json())
        self.assertIn('user', response.json())
        self.assertIn('refresh', response.cookies)

    def test_login_user_invalid(self):
        data = {'username': 'none', 'password': 'nopass'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())
