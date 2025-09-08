<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Liste des participants - {{ $meeting->nom }}</title>
    <style>
        @page {
            margin: 1.5cm;
            size: A4;
        }
        
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.6;
            background-color: #fff;
        }
        
        .header {
            display: flex;
            align-items: center;
            margin-bottom: 25px;
            border-bottom: 2px solid rgb(77, 77, 77);
            padding-bottom: 20px;
        }
        
        .logo-container {
            width: 25%;
            text-align: center;
        }
        
        .logo {
            max-width: 100px;
            height: auto;
        }
        
        .title-container {
            width: 75%;
            margin: 0 auto;
            text-align: center;
        }
        
        .institution {
            font-size: 18px;
            font-weight: bold;
            color:rgb(2, 78, 6);
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        
        .document-title {
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 10px;
            color:rgb(0, 0, 0);
        }
        
        .meeting-info {
            margin-bottom: 25px;
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid rgb(10, 60, 2);
        }
        
        .meeting-name {
            font-size: 18px;
            font-weight: bold;
            color:rgb(18, 92, 3);
            margin-bottom: 10px;
        }
        
        .participants-count {
            font-size: 16px;
            color: #555;
            margin-bottom: 8px;
        }
        
        .meeting-location {
            font-size: 16px;
            color: #555;
            font-style: italic;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        th {
            background-color:rgb(99, 102, 107);
            color: white;
            padding: 12px 15px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 14px;
        }
        
        td {
            padding: 10px 15px;
            border-bottom: 1px solid #e0e0e0;
        }
        
        tr:nth-child(even) {
            background-color: #f8f9fa;
        }
        
        tr:hover {
            background-color: #f1f3f5;
        }
        
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e0e0e0;
            padding-top: 10px;
        }
        
        .signature-area {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        
        .signature-line {
            width: 45%;
            border-top: 1px solid #333;
            padding-top: 25px;
            text-align: center;
            font-size: 14px;
        }
        
        .date {
            margin-top: 30px;
            text-align: right;
            font-style: italic;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <!-- <div class="logo-container">
            <img src="{{ public_path('images/Icon.png') }}" class="logo" alt="Logo INPHB">
        </div> -->

        <div class="title-container">
            <div class="institution">Institut National Polytechnique Félix Houphouët-Boigny</div>
            <div class="document-title">FEUILLE DE PRÉSENCE</div>
        </div>
    </div>
    
    <div class="meeting-info">
        <div class="meeting-name">Réunion: {{ $meeting->nom }}</div>
        <div class="participants-count">Nombre de participants: {{ $meeting->participants->count() }}</div>
        <div class="meeting-location">Lieu: {{ $meeting->lieu ?? 'Non spécifié' }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>N°</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Fonction</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach($meeting->participants as $index => $participant)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $participant->nom }}</td>
                    <td>{{ $participant->prenom }}</td>
                    <td>{{ $participant->fonction }}</td>
                    <td>{{ $participant->email ?? '-' }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    
    <div class="signature-area">
        <div class="signature-line">Signature autorisée</div>
        <div class="signature-line">Cachet de l'établissement</div>
    </div>
    
    <div class="date">Généré le: {{ date('d/m/Y à H:i') }}</div>
    
    <div class="footer">
        INPHB - Institut National Polytechnique Félix Houphouët-Boigny | Yamoussoukro, Côte d'Ivoire
    </div>
</body>
</html>