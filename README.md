# n8n-nodes-tazman

A custom n8n node for integrating with the Tazman API. This node provides comprehensive functionality to interact with Tazman's client, course, meeting, and teacher management system.

## Features

- **Client Management**: Create, read, update, and delete clients
- **Course Management**: Manage courses and their details
- **Meeting Management**: Handle meetings, scheduling, and teacher assignments
- **Teacher Management**: Manage teacher profiles and information
- **Hebrew Support**: Full support for Hebrew text and client states
- **Dynamic Configuration**: No hardcoded values, fully API-driven

## Installation

### Prerequisites

- Node.js (v16 or higher)
- n8n (v0.200.0 or higher)
- TypeScript (for development)

### Install the Node

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/tazman/n8n-nodes-tazman.git
   cd n8n-nodes-tazman
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the node:**
   ```bash
   npm run build
   ```

4. **Link the node to n8n:**
   ```bash
   npm link
   ```

5. **In your n8n installation directory, link the custom node:**
   ```bash
   npm link n8n-nodes-tazman
   ```

6. **Restart n8n** to recognize the new node.

## Configuration

### Credentials

Before using the Tazman node, you need to configure the API credentials:

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **Tazman API**
3. Fill in the required fields:
   - **Base URL**: Your Tazman API base URL (e.g., `https://api.tazman.com`)
   - **API Key**: Your Tazman API key
   - **Username**: Your Tazman username (if required)
   - **Password**: Your Tazman password (if required)

### Node Usage

1. **Add the Tazman node** to your workflow
2. **Select the resource** you want to work with:
   - Client
   - Course
   - Meeting
   - Teacher
3. **Choose the operation**:
   - Create
   - Get
   - Get All
   - Update
   - Delete
4. **Configure the required fields** based on your selected operation

## Available Operations

### Client Operations

- **Create Client**: Add a new client with first name, last name, email, phone, and state
- **Get Client**: Retrieve a specific client by ID
- **Get All Clients**: Fetch all clients
- **Update Client**: Modify an existing client's information
- **Delete Client**: Remove a client from the system
- **Get Client States**: Retrieve available client states from the API

**Client States:**
- Dynamic client states (not hardcoded)
- Use "Get Client States" operation to retrieve available states
- Common states include: `פעיל` (Active), `לא פעיל` (Inactive), `נרשם לניסיון` (Trial Registration)
- Fully configurable through the API

### Course Operations

- **Create Course**: Add a new course with title
- **Get Course**: Retrieve a specific course by ID
- **Get All Courses**: Fetch all courses
- **Update Course**: Modify an existing course
- **Delete Course**: Remove a course from the system

### Meeting Operations

- **Create Meeting**: Schedule a new meeting with course, dates, and teachers
- **Get Meeting**: Retrieve a specific meeting by ID
- **Get All Meetings**: Fetch all meetings
- **Update Meeting**: Modify an existing meeting
- **Delete Meeting**: Remove a meeting from the system

### Teacher Operations

- **Create Teacher**: Add a new teacher with name, email, and phone
- **Get Teacher**: Retrieve a specific teacher by ID
- **Get All Teachers**: Fetch all teachers
- **Update Teacher**: Modify an existing teacher's information
- **Delete Teacher**: Remove a teacher from the system

## Example Workflows

### Client Registration Workflow

1. **Webhook Trigger** - Receive client data
2. **Tazman Node** - Create client
3. **Email Node** - Send welcome email
4. **Tazman Node** - Get all clients to verify

### Meeting Reminder Workflow

1. **Schedule Trigger** - Run daily
2. **Tazman Node** - Get all meetings for today
3. **IF Node** - Check if clients have trial status
4. **Tazman Node** - Get client details
5. **Email/SMS Node** - Send reminders

## API Reference

For detailed API documentation, refer to the [Tazman API Documentation](https://documenter.getpostman.com/view/15160070/2sA3kPoPtZ).

## Development

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue in this repository
- Check the [n8n Community Forum](https://community.n8n.io/)
- Refer to the [n8n Documentation](https://docs.n8n.io/)

## Changelog

### v1.0.0
- Initial release
- Support for all Tazman API operations
- Hebrew language support
- Dynamic client states
- Comprehensive error handling
