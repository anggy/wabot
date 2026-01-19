import 'package:flutter/material.dart';
import '../services/api_service.dart';

class RuleFormScreen extends StatefulWidget {
  final Map<String, dynamic>? rule;

  const RuleFormScreen({super.key, this.rule});

  @override
  State<RuleFormScreen> createState() => _RuleFormScreenState();
}

class _RuleFormScreenState extends State<RuleFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _triggerValueController = TextEditingController();
  final _responseContentController = TextEditingController();
  final _sessionIdController = TextEditingController();

  String _triggerType = 'KEYWORD';
  String _actionType = 'RESPONSE';
  bool _isLoading = false;
  final ApiService _apiService = ApiService();

  @override
  void initState() {
    super.initState();
    if (widget.rule != null) {
      _nameController.text = widget.rule!['name'] ?? '';
      _triggerValueController.text = widget.rule!['triggerValue'] ?? '';
      _responseContentController.text = widget.rule!['responseContent'] ?? '';
      _sessionIdController.text = widget.rule!['sessionId'] ?? '';
      _triggerType = widget.rule!['triggerType'] ?? 'KEYWORD';
      _actionType = widget.rule!['actionType'] ?? 'RESPONSE';
    }
  }

  @override
  void dispose() {
    _nameController.dispose();
    _triggerValueController.dispose();
    _responseContentController.dispose();
    _sessionIdController.dispose();
    super.dispose();
  }

  Future<void> _saveRule() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    final data = {
      'name': _nameController.text,
      'triggerType': _triggerType,
      'triggerValue': _triggerValueController.text,
      'actionType': _actionType,
      'responseContent': _responseContentController.text,
      'sessionId': _sessionIdController.text.isEmpty
          ? null
          : _sessionIdController.text,
    };

    try {
      if (widget.rule != null) {
        await _apiService.updateRule(widget.rule!['id'], data);
      } else {
        await _apiService.createRule(data);
      }
      if (mounted) {
        Navigator.pop(context, true); // Return true to indicate success
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Error: $e')));
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.rule != null ? 'Edit Rule' : 'New Rule'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Rule Name'),
                validator: (value) =>
                    value!.isEmpty ? 'Please enter a name' : null,
              ),
              const SizedBox(height: 16),
              InputDecorator(
                decoration: const InputDecoration(labelText: 'Trigger Type'),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _triggerType,
                    isDense: true,
                    items: const [
                      DropdownMenuItem(
                        value: 'KEYWORD',
                        child: Text('KEYWORD'),
                      ),
                      DropdownMenuItem(
                        value: 'STARTS_WITH',
                        child: Text('STARTS_WITH'),
                      ),
                      DropdownMenuItem(
                        value: 'CONTAINS',
                        child: Text('CONTAINS'),
                      ),
                      DropdownMenuItem(
                        value: 'EXACT_MATCH',
                        child: Text('EXACT_MATCH'),
                      ),
                      DropdownMenuItem(value: 'ANY', child: Text('ANY')),
                    ],
                    onChanged: (value) => setState(() => _triggerType = value!),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _triggerValueController,
                decoration: const InputDecoration(labelText: 'Trigger Value'),
                validator: (value) =>
                    value!.isEmpty ? 'Please enter a trigger value' : null,
              ),
              const SizedBox(height: 16),
              InputDecorator(
                decoration: const InputDecoration(labelText: 'Action Type'),
                child: DropdownButtonHideUnderline(
                  child: DropdownButton<String>(
                    value: _actionType,
                    isDense: true,
                    items: const [
                      DropdownMenuItem(
                        value: 'RESPONSE',
                        child: Text('RESPONSE'),
                      ),
                      DropdownMenuItem(value: 'API', child: Text('API')),
                      DropdownMenuItem(
                        value: 'AI_REPLY',
                        child: Text('AI_REPLY'),
                      ),
                    ],
                    onChanged: (value) => setState(() => _actionType = value!),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _responseContentController,
                decoration: const InputDecoration(
                  labelText: 'Response Content',
                ),
                maxLines: 3,
                validator: (value) =>
                    value!.isEmpty ? 'Please enter response content' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _sessionIdController,
                decoration: const InputDecoration(
                  labelText: 'Session ID (Optional)',
                  hintText: 'Apply to specific session only',
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: _isLoading ? null : _saveRule,
                child: _isLoading
                    ? const CircularProgressIndicator()
                    : const Text('Save Rule'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
