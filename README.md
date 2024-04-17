# BE-Cloudinary-Integration

## Benutzerregistrierung, Anmeldung und Cloudinary-Integration

In diesem Projekt wurde eine einfache React-Frontend-Anwendung zur Benutzerregistrierung, Anmeldung und Profilverwaltung entwickelt. Ein wesentlicher Teil des Projekts ist die Integration von Cloudinary, um Benutzerprofilbilder hochzuladen und zu verwalten.

### Projektübersicht

Die Anwendung ermöglicht es den Benutzern, sich zu registrieren, anzumelden und ihr Profil zu verwalten. Die Authentifizierung erfolgt über sichere Methoden, und alle sensiblen Anfragen an das Backend erfordern ein gültiges Token.

### Funktionen

#### 1. **Einrichten einer React-Anwendung**

- Eine neue React-Anwendung wurde eingerichtet und konfiguriert, um die Grundlage für die Benutzerverwaltung zu bilden.

#### 2. **Implementierung des Registrierungsformulars**

- **Benutzerregistrierung:** Ein Formular wurde erstellt, um Benutzernamen, E-Mail, Passwort und das Hochladen eines Profilbildes zu ermöglichen.
- **Validierung:** Die Eingaben im Formular werden auf Gültigkeit überprüft und entsprechende Fehlermeldungen werden angezeigt.
- **Datenspeicherung:** Bei erfolgreicher Registrierung werden die Benutzerdaten in der Backend-Datenbank gespeichert.

#### 3. **Implementierung des Anmeldeformulars**

- **Benutzeranmeldung:** Es wurde ein Anmeldeformular mit Feldern für E-Mail und Passwort entwickelt.
- **Validierung der Anmeldedaten:** Die Eingaben werden validiert, und bei Ungültigkeit werden entsprechende Fehlermeldungen dargestellt.
- **Authentifizierungsmethoden:** Authentifizierungsmethoden wurden implementiert, um die Anmeldedaten der Benutzer mit dem Backend zu verifizieren.

#### 4. **Implementierung der Profilverwaltung**

- **Zugänglichkeit:** Nach erfolgreicher Anmeldung ist die Benutzerprofilseite zugänglich.
- **Anzeige von Benutzerdetails:** Benutzername, E-Mail und Profilbild werden angezeigt.
- **Bearbeitung von Benutzerdaten:** Benutzer können ihren Benutzernamen, ihre E-Mail-Adresse und ihr Passwort mit entsprechender Validierung bearbeiten.
- **Integration von Cloudinary:** Für das Hochladen und Verwalten der Benutzerprofilbilder wurde Cloudinary integriert.
- **Bildaktualisierung:** Beim Hochladen eines neuen Profilbildes wird das alte Bild in Cloudinary gelöscht und durch das neue ersetzt.

#### 5. **Authentifizierungsintegration**

- **Sicherstellung der Authentifizierung:** Alle Frontend-Anfragen, die Authentifizierung erfordern, werden mit einem gültigen Token gesendet.
- **Backend-Routen:** Backend-Routen für Benutzerregistrierung, Anmeldung und Profilverwaltung wurden unter Verwendung von JWT-Token implementiert.

### Technologien

- **Frontend:** React, React Router, Bootstrap für das UI-Design.
- **Backend:** Node.js, Express für das Server-Management.
- **Datenbank:** MongoDB für die Datenspeicherung.
- **Authentifizierung:** JWT (JSON Web Tokens) für sichere Authentifizierungsverfahren.
- **Bildverwaltung:** Cloudinary zur Speicherung und Verwaltung von Bildern.

Dieses Projekt zeigt eine effiziente Integration verschiedener Technologien zur Schaffung einer sicheren und benutzerfreundlichen Webanwendung.
