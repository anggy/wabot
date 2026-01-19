import 'package:flutter/material.dart';
import '../widgets/app_drawer.dart';
import '../services/api_service.dart';

class ContactScreen extends StatefulWidget {
  const ContactScreen({super.key});

  @override
  State<ContactScreen> createState() => _ContactScreenState();
}

class _ContactScreenState extends State<ContactScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<dynamic>> _contactsFuture;

  @override
  void initState() {
    super.initState();
    _contactsFuture = _apiService.getContacts();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Contacts')),
      drawer: const AppDrawer(),
      body: FutureBuilder<List<dynamic>>(
        future: _contactsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No contacts found.'));
          }

          final contacts = snapshot.data!;
          return ListView.builder(
            itemCount: contacts.length,
            itemBuilder: (context, index) {
              final contact = contacts[index];
              return ListTile(
                title: Text(contact['name']),
                subtitle: Text(contact['phone']),
                leading: const Icon(Icons.person),
              );
            },
          );
        },
      ),
    );
  }
}
