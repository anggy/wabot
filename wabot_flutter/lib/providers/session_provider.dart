import 'package:flutter/material.dart';
import '../services/api_service.dart';
import '../models/session.dart';

class SessionProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  List<Session> _sessions = [];
  bool _isLoading = false;
  String? _error;

  List<Session> get sessions => _sessions;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchSessions() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final data = await _apiService.getSessions();
      _sessions = data.map((json) => Session.fromJson(json)).toList();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> addSession(String id, String description) async {
    try {
      await _apiService.createSession(id, description);
      await fetchSessions(); // Refresh list
    } catch (e) {
      rethrow;
    }
  }

  Future<void> deleteSession(String id) async {
    try {
      await _apiService.deleteSession(id);
      await fetchSessions(); // Refresh list
    } catch (e) {
      rethrow;
    }
  }
}
