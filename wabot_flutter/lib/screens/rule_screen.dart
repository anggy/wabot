import 'package:flutter/material.dart';
import '../widgets/app_drawer.dart';
import '../services/api_service.dart';
import 'rule_form_screen.dart';

class RuleScreen extends StatefulWidget {
  const RuleScreen({super.key});

  @override
  State<RuleScreen> createState() => _RuleScreenState();
}

class _RuleScreenState extends State<RuleScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<dynamic>> _rulesFuture;

  @override
  void initState() {
    super.initState();
    _fetchRules();
  }

  void _fetchRules() {
    setState(() {
      _rulesFuture = _apiService.getRules();
    });
  }

  Future<void> _deleteRule(int id) async {
    try {
      await _apiService.deleteRule(id);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Rule deleted successfully')),
        );
        _fetchRules();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Error deleting rule: $e')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Rules')),
      drawer: const AppDrawer(),
      body: FutureBuilder<List<dynamic>>(
        future: _rulesFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No rules found.'));
          }

          final rules = snapshot.data!;
          return ListView.builder(
            itemCount: rules.length,
            itemBuilder: (context, index) {
              final rule = rules[index];
              return ListTile(
                title: Text(rule['name'] ?? rule['triggerValue'] ?? 'No Name'),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Trigger: ${rule['triggerValue']} (${rule['triggerType']})',
                    ),
                    Text(
                      'Response: ${rule['responseContent'] ?? 'No Response'}',
                    ),
                    if (rule['sessionId'] != null)
                      Text(
                        'Session: ${rule['sessionId']}',
                        style: TextStyle(
                          color: Colors.blue[800],
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                  ],
                ),
                leading: const Icon(Icons.abc),
                trailing: IconButton(
                  icon: const Icon(Icons.delete, color: Colors.red),
                  onPressed: () => _deleteRule(rule['id']),
                ),
                onTap: () async {
                  final result = await Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => RuleFormScreen(rule: rule),
                    ),
                  );
                  if (result == true) {
                    _fetchRules();
                  }
                },
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const RuleFormScreen()),
          );
          if (result == true) {
            _fetchRules();
          }
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
