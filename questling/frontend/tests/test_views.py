from django.test import TestCase
from frontend.views import index


class IndexViewTests(TestCase):
    def test_given_empty_request_renders_status_ok(self):
        http_request = {}
        http_response = index(http_request)

        self.assertEqual(http_response.status_code, 200)
        self.assertEqual(http_response.reason_phrase, "OK")

    def test_given_empty_request_renders_html_content_with_div_id_app(self):
        http_request = {}
        http_response = index(http_request)

        self.assertEqual(http_response.charset, "utf-8")

        decoded_html = http_response.content.decode("utf8")

        self.assertTrue(decoded_html.startswith('<!DOCTYPE html>\n<html lang="en">'))
        self.assertIn("<head>", decoded_html)
        self.assertIn("<title>Questling</title>", decoded_html)
        self.assertIn("</head>", decoded_html)
        self.assertIn("<body>", decoded_html)
        self.assertIn('<div id="app"></div>', decoded_html)
        self.assertIn("<body>", decoded_html)
        self.assertTrue(decoded_html.endswith("</html>"))
