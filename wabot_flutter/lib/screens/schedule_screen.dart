import 'package:flutter/material.dart';
import '../widgets/app_drawer.dart';
import '../services/api_service.dart';

class ScheduleScreen extends StatefulWidget {
  const ScheduleScreen({super.key});

  @override
  State<ScheduleScreen> createState() => _ScheduleScreenState();
}

class _ScheduleScreenState extends State<ScheduleScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<dynamic>> _schedulesFuture;

  @override
  void initState() {
    super.initState();
    _schedulesFuture = _apiService.getSchedules();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Schedules')),
      drawer: const AppDrawer(),
      body: FutureBuilder<List<dynamic>>(
        future: _schedulesFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No schedules found.'));
          }

          final schedules = snapshot.data!;
          return ListView.builder(
            itemCount: schedules.length,
            itemBuilder: (context, index) {
              final schedule = schedules[index];
              return ListTile(
                title: Text('To: ${schedule['recipient'] ?? 'Unknown'}'),
                subtitle: Text(
                  'Message: ${schedule['content'] ?? ''} \nCron: ${schedule['cronExpression']}',
                ),
                leading: const Icon(Icons.schedule),
                isThreeLine: true,
              );
            },
          );
        },
      ),
    );
  }
}
