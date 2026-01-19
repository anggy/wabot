import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/session_provider.dart';
import '../widgets/app_drawer.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        Provider.of<SessionProvider>(context, listen: false).fetchSessions();
      }
    });
  }

  Uint8List _decodeBase64(String dataUri) {
    try {
      final base64String = dataUri.split(',').last;
      return base64Decode(base64String);
    } catch (e) {
      return Uint8List(0);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Wabot Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              Provider.of<SessionProvider>(
                context,
                listen: false,
              ).fetchSessions();
            },
          ),
        ],
      ),
      drawer: const AppDrawer(),
      body: Consumer<SessionProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (provider.error != null) {
            return Center(child: Text('Error: ${provider.error}'));
          }
          if (provider.sessions.isEmpty) {
            return const Center(child: Text('No sessions found. Add one!'));
          }
          return ListView.builder(
            itemCount: provider.sessions.length,
            itemBuilder: (context, index) {
              final session = provider.sessions[index];
              return Card(
                margin: const EdgeInsets.all(8.0),
                child: ExpansionTile(
                  title: Text(
                    session.name.isNotEmpty ? session.name : session.id,
                  ),
                  subtitle: Text('Status: ${session.status}'),
                  children: [
                    if (session.qr != null)
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          children: [
                            const Text("Scan this QR Code"),
                            const SizedBox(height: 10),
                            Image.memory(
                              _decodeBase64(session.qr!),
                              width: 250,
                              height: 250,
                              errorBuilder: (context, error, stackTrace) =>
                                  const Text('Failed to load QR code'),
                            ),
                          ],
                        ),
                      ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        TextButton(
                          onPressed: () => _deleteSession(session.id),
                          child: const Text(
                            'DELETE',
                            style: TextStyle(color: Colors.red),
                          ),
                        ),
                        const SizedBox(width: 8),
                      ],
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddSessionDialog,
        child: const Icon(Icons.add),
      ),
    );
  }

  void _showAddSessionDialog() {
    final idController = TextEditingController();
    final nameController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Add Session'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: idController,
              decoration: const InputDecoration(
                labelText: 'Session ID (e.g. main)',
              ),
            ),
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Description'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              final navigator = Navigator.of(context);
              final messenger = ScaffoldMessenger.of(context);
              final sessionProvider = Provider.of<SessionProvider>(
                context,
                listen: false,
              );

              try {
                // First close the dialog
                navigator.pop();

                // Then perform api call
                await sessionProvider.addSession(
                  idController.text,
                  nameController.text,
                );
              } catch (e) {
                messenger.showSnackBar(
                  SnackBar(content: Text('Failed to add session: $e')),
                );
              }
            },
            child: const Text('Add'),
          ),
        ],
      ),
    );
  }

  Future<void> _deleteSession(String id) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirm Delete'),
        content: Text('Are you sure you want to delete session $id?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: const Text('Delete'),
          ),
        ],
      ),
    );

    if (confirmed == true) {
      if (!mounted) return;
      final sessionProvider = Provider.of<SessionProvider>(
        context,
        listen: false,
      );
      final messenger = ScaffoldMessenger.of(context);

      try {
        await sessionProvider.deleteSession(id);
      } catch (e) {
        messenger.showSnackBar(
          SnackBar(content: Text('Failed to delete session: $e')),
        );
      }
    }
  }
}
