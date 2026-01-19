import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  // Define base URL. Note: The user mentioned https://wabot.homesislab.my.id/login
  // The API is likely at /api based on server code.
  static const String baseUrl = 'https://wabot.homesislab.my.id/api';

  Future<Map<String, String>> _getHeaders() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  Future<dynamic> login(String username, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'username': username, 'password': password}),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to login: ${response.body}');
    }
  }

  Future<List<dynamic>> getSessions() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('$baseUrl/sessions'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    } else {
      throw Exception('Failed to load sessions: ${response.body}');
    }
  }

  Future<dynamic> createSession(String id, String description) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('$baseUrl/sessions'),
      headers: headers,
      body: jsonEncode({
        'id': id,
        'name': description,
      }), // Server expects 'name'
    );

    if (response.statusCode == 201 || response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to create session: ${response.body}');
    }
  }

  Future<void> deleteSession(String id) async {
    final headers = await _getHeaders();
    final response = await http.delete(
      Uri.parse('$baseUrl/sessions/$id'),
      headers: headers,
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to delete session: ${response.body}');
    }
  }

  Future<List<dynamic>> getRules() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('$baseUrl/rules'),
      headers: headers,
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    } else {
      throw Exception('Failed to load rules: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> createRule(Map<String, dynamic> data) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse('$baseUrl/rules'),
      headers: headers,
      body: jsonEncode(data),
    );

    if (response.statusCode == 201 || response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to create rule: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> updateRule(
    int id,
    Map<String, dynamic> data,
  ) async {
    final headers = await _getHeaders();
    final response = await http.put(
      Uri.parse('$baseUrl/rules/$id'),
      headers: headers,
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to update rule: ${response.body}');
    }
  }

  Future<void> deleteRule(int id) async {
    final headers = await _getHeaders();
    final response = await http.delete(
      Uri.parse('$baseUrl/rules/$id'),
      headers: headers,
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to delete rule: ${response.body}');
    }
  }

  Future<List<dynamic>> getContacts() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('$baseUrl/contacts'),
      headers: headers,
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    } else {
      throw Exception('Failed to load contacts: ${response.body}');
    }
  }

  Future<List<dynamic>> getSchedules() async {
    final headers = await _getHeaders();
    final response = await http.get(
      Uri.parse('$baseUrl/schedules'),
      headers: headers,
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    } else {
      throw Exception('Failed to load schedules: ${response.body}');
    }
  }
}
