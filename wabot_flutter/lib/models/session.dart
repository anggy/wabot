class Session {
  final String id;
  final String name;
  final String status;
  final String? qr;

  Session({
    required this.id,
    required this.name,
    required this.status,
    this.qr,
  });

  factory Session.fromJson(Map<String, dynamic> json) {
    return Session(
      id: json['id'] as String,
      name: json['name'] as String? ?? '',
      status: json['status'] as String? ?? 'unknown',
      qr: json['qr'] as String?,
    );
  }
}
