import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Tazman implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tazman',
		name: 'tazman',
		icon: 'file:tazman.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Tazman API - Meeting and Client management',
		defaults: {
			name: 'Tazman',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'tazmanApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Meeting',
						value: 'meeting',
					},
					{
						name: 'Client',
						value: 'client',
					},
				],
				default: 'client',
			},
			// Meeting Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['meeting'],
					},
				},
				options: [
					{
						name: 'Cancel',
						value: 'cancel',
						action: 'Cancel a meeting',
						description: 'Cancel an existing meeting',
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a meeting',
						description: 'Create a new meeting',
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a meeting',
						description: 'Update an existing meeting',
					},
					{
						name: 'Get Meeting Clients',
						value: 'getMeetingClients',
						action: 'Get meeting clients',
						description: 'Get all clients for a specific meeting',
					},
				],
				default: 'create',
			},
			// Client Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['client'],
					},
				},
				options: [
					{
						name: 'Get All',
						value: 'getAll',
						action: 'Get all clients',
						description: 'Get all clients with optional filters',
					},
					{
						name: 'Get Single',
						value: 'getSingle',
						action: 'Get single client',
						description: 'Get a single client by ID',
					},
					{
						name: 'Save Client',
						value: 'saveClient',
						action: 'Save client',
						description: 'Create or update a client',
					},
				],
				default: 'getAll',
			},
			// Meeting Cancel Parameters
			{
				displayName: 'Schedule ID',
				name: 'scheduleId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['cancel'],
					},
				},
				default: 0,
				required: true,
				description: 'The schedule ID of the meeting to cancel',
			},
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['cancel'],
					},
				},
				default: 0,
				required: true,
				description: 'The client ID for the meeting to cancel',
			},
			{
				displayName: 'Ignore Time Restriction',
				name: 'ignoreTimeRestriction',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['cancel'],
					},
				},
				default: false,
				description: 'Whether to ignore time restrictions when canceling',
			},
			// Meeting Create Parameters
			{
				displayName: 'Course ID',
				name: 'courseId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['create'],
					},
				},
				default: 0,
				required: true,
				description: 'The course ID for the meeting',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'The date of the meeting (YYYY-MM-DD format)',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['create'],
					},
				},
				default: '08:00',
				required: true,
				description: 'The start time of the meeting (HH:MM format)',
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['create'],
					},
				},
				default: '09:00',
				required: true,
				description: 'The end time of the meeting (HH:MM format)',
			},
			{
				displayName: 'CPerson ID',
				name: 'cpersonId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['create'],
					},
				},
				default: 0,
				required: true,
				description: 'The contact person ID for the meeting',
			},
			// Meeting Update Parameters
			{
				displayName: 'Meeting ID',
				name: 'meetingId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['update'],
					},
				},
				default: 0,
				required: true,
				description: 'The ID of the meeting to update',
			},
			// Meeting Get Clients Parameters
			{
				displayName: 'Meeting ID',
				name: 'meetingId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['getMeetingClients'],
					},
				},
				default: 0,
				required: true,
				description: 'The ID of the meeting to get clients for',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The updated date of the meeting (YYYY-MM-DD format)',
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The updated start time of the meeting (HH:MM format)',
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The updated end time of the meeting (HH:MM format)',
			},
			{
				displayName: 'CPerson ID',
				name: 'cpersonId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['meeting'],
						operation: ['update'],
					},
				},
				default: 0,
				description: 'The updated contact person ID for the meeting',
			},
			// Client Get All Parameters
			{
				displayName: 'Filter by ID Number',
				name: 'filterIdNum',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Filter clients by ID number',
			},
			{
				displayName: 'Filter by Email',
				name: 'filterEmail',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Filter clients by email address',
			},
			{
				displayName: 'Filter by Phone',
				name: 'filterPhone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Filter clients by phone number',
			},
			// Client Get Single Parameters
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getSingle'],
					},
				},
				default: 0,
				required: true,
				description: 'The ID of the client to retrieve',
			},
			{
				displayName: 'Filter by Client ID',
				name: 'filterClientId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getSingle'],
					},
				},
				default: '',
				description: 'Additional filter by client ID',
			},
			{
				displayName: 'Filter by Email',
				name: 'filterEmail',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getSingle'],
					},
				},
				default: '',
				description: 'Additional filter by email',
			},
			{
				displayName: 'Filter by ID Number',
				name: 'filterIdNum',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getSingle'],
					},
				},
				default: '',
				description: 'Additional filter by ID number',
			},
			{
				displayName: 'Filter by Phone',
				name: 'filterPhone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['getSingle'],
					},
				},
				default: '',
				description: 'Additional filter by phone',
			},
			// Client Save Parameters
			{
				displayName: 'First Name',
				name: 'nameF',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				required: true,
				description: 'Client first name',
			},
			{
				displayName: 'Last Name',
				name: 'nameS',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				required: true,
				description: 'Client last name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				required: true,
				description: 'Client email address',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Primary phone number',
			},
			{
				displayName: 'Phone 2',
				name: 'phone2',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Secondary phone number',
			},
			{
				displayName: 'Parent Client ID',
				name: 'parentClientId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: 0,
				description: 'Parent client ID',
			},
			{
				displayName: 'Location ID',
				name: 'locationId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: 0,
				description: 'Location ID',
			},
			{
				displayName: 'State ID',
				name: 'stateId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: 0,
				description: 'State ID',
			},
			{
				displayName: 'Fax',
				name: 'fax',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Fax number',
			},
			{
				displayName: 'Additional SMS Phone 1',
				name: 'addSmsPhone1',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Additional SMS phone number 1',
			},
			{
				displayName: 'Additional SMS Phone 2',
				name: 'addSmsPhone2',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Additional SMS phone number 2',
			},
			{
				displayName: 'Birthday',
				name: 'birthday',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Client birthday (YYYY-MM-DD format)',
			},
			{
				displayName: 'Sex',
				name: 'sex',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				options: [
					{
						name: 'Male',
						value: 'male',
					},
					{
						name: 'Female',
						value: 'female',
					},
				],
				default: '',
				description: 'Client gender',
			},
			{
				displayName: 'ID Number',
				name: 'idNum',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Client ID number',
			},
			{
				displayName: 'City Other',
				name: 'cityOther',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Other city name',
			},
			{
				displayName: 'Index',
				name: 'index',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Postal index',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Client address',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Client password',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Additional comment about the client',
			},
			{
				displayName: 'External Account ID',
				name: 'extAccId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: 0,
				description: 'External account ID',
			},
			{
				displayName: 'Invoice ID Number',
				name: 'invoiceIdNum',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Invoice ID number',
			},
			{
				displayName: 'Invoice Name',
				name: 'invoiceName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: '',
				description: 'Invoice name',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: {},
				description: 'Client tags (click + to add multiple tags)',
				options: [
					{
						name: 'tagValues',
						displayName: 'Tag',
						values: [
							{
								displayName: 'Tag ID',
								name: 'tagId',
								type: 'number',
								default: 0,
								description: 'The tag ID',
							},
							{
								displayName: 'Tag Value',
								name: 'tagValue',
								type: 'boolean',
								default: true,
								description: 'The tag value (true/false)',
							},
						],
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'fixedCollection',
				displayOptions: {
					show: {
						resource: ['client'],
						operation: ['saveClient'],
					},
				},
				default: {},
				description: 'Additional custom fields (click + to add multiple fields)',
				options: [
					{
						name: 'fieldValues',
						displayName: 'Field',
						values: [
							{
								displayName: 'Field ID',
								name: 'fieldId',
								type: 'number',
								default: 0,
								description: 'The field ID',
							},
							{
								displayName: 'Field Value',
								name: 'fieldValue',
								type: 'string',
								default: '',
								description: 'The field value',
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData: any;

				if (resource === 'meeting') {
					responseData = await this.executeMeetingOperation(operation, i, this);
				} else if (resource === 'client') {
					responseData = await this.executeClientOperation(operation, i, this);
				}

				returnData.push({
					json: responseData,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error instanceof Error ? error.message : String(error) },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}

	private async executeMeetingOperation(operation: string, itemIndex: number, context: IExecuteFunctions): Promise<any> {
		const baseUrl = context.getCredentials('tazmanApi')?.baseUrl as string;

		switch (operation) {
			case 'cancel':
				const cancelData = {
					schedule_id: context.getNodeParameter('scheduleId', itemIndex) as number,
					client_id: context.getNodeParameter('clientId', itemIndex) as number,
					ignore_time_restriction: context.getNodeParameter('ignoreTimeRestriction', itemIndex) as boolean,
				};
				return await context.helpers.httpRequest({
					method: 'POST',
					url: `${baseUrl}/meetings/cancel`,
					body: cancelData,
				});

			case 'create':
				const createData = {
					course_id: context.getNodeParameter('courseId', itemIndex) as number,
					date: context.getNodeParameter('date', itemIndex) as string,
					start_time: context.getNodeParameter('startTime', itemIndex) as string,
					end_time: context.getNodeParameter('endTime', itemIndex) as string,
					cperson_id: context.getNodeParameter('cpersonId', itemIndex) as number,
				};
				return await context.helpers.httpRequest({
					method: 'POST',
					url: `${baseUrl}/meetings`,
					body: createData,
				});

			case 'update':
				const meetingId = context.getNodeParameter('meetingId', itemIndex) as number;
				const updateData: any = {};
				
				const updateDate = context.getNodeParameter('date', itemIndex) as string;
				const updateStartTime = context.getNodeParameter('startTime', itemIndex) as string;
				const updateEndTime = context.getNodeParameter('endTime', itemIndex) as string;
				const updateCpersonId = context.getNodeParameter('cpersonId', itemIndex) as number;

				if (updateDate) updateData.date = updateDate;
				if (updateStartTime) updateData.start_time = updateStartTime;
				if (updateEndTime) updateData.end_time = updateEndTime;
				if (updateCpersonId) updateData.cperson_id = updateCpersonId;

				return await context.helpers.httpRequest({
					method: 'PUT',
					url: `${baseUrl}/meetings/${meetingId}`,
					body: updateData,
				});

			case 'getMeetingClients':
				const getClientsMeetingId = context.getNodeParameter('meetingId', itemIndex) as number;
				return await context.helpers.httpRequest({
					method: 'GET',
					url: `${baseUrl}/meetings/${getClientsMeetingId}/clients`,
				});

			default:
				throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
		}
	}

	private async executeClientOperation(operation: string, itemIndex: number, context: IExecuteFunctions): Promise<any> {
		const baseUrl = context.getCredentials('tazmanApi')?.baseUrl as string;

		switch (operation) {
			case 'getAll':
				const queryParams: string[] = [];
				
				const filterIdNum = context.getNodeParameter('filterIdNum', itemIndex) as string;
				const filterEmail = context.getNodeParameter('filterEmail', itemIndex) as string;
				const filterPhone = context.getNodeParameter('filterPhone', itemIndex) as string;

				if (filterIdNum) queryParams.push(`filter[id_num]=${encodeURIComponent(filterIdNum)}`);
				if (filterEmail) queryParams.push(`filter[email]=${encodeURIComponent(filterEmail)}`);
				if (filterPhone) queryParams.push(`filter[phone]=${encodeURIComponent(filterPhone)}`);

				const queryString = queryParams.join('&');
				const url = queryString ? `${baseUrl}/clients?${queryString}` : `${baseUrl}/clients`;

				return await context.helpers.httpRequest({
					method: 'GET',
					url: url,
				});

			case 'getSingle':
				const clientId = context.getNodeParameter('clientId', itemIndex) as number;
				const singleQueryParams: string[] = [];
				
				const singleFilterClientId = context.getNodeParameter('filterClientId', itemIndex) as string;
				const singleFilterEmail = context.getNodeParameter('filterEmail', itemIndex) as string;
				const singleFilterIdNum = context.getNodeParameter('filterIdNum', itemIndex) as string;
				const singleFilterPhone = context.getNodeParameter('filterPhone', itemIndex) as string;

				if (singleFilterClientId) singleQueryParams.push(`filter[client_id]=${encodeURIComponent(singleFilterClientId)}`);
				if (singleFilterEmail) singleQueryParams.push(`filter[email]=${encodeURIComponent(singleFilterEmail)}`);
				if (singleFilterIdNum) singleQueryParams.push(`filter[id_num]=${encodeURIComponent(singleFilterIdNum)}`);
				if (singleFilterPhone) singleQueryParams.push(`filter[phone]=${encodeURIComponent(singleFilterPhone)}`);

				const singleQueryString = singleQueryParams.join('&');
				const singleUrl = singleQueryString ? `${baseUrl}/clients/${clientId}?${singleQueryString}` : `${baseUrl}/clients/${clientId}`;

				return await context.helpers.httpRequest({
					method: 'GET',
					url: singleUrl,
				});

			case 'saveClient':
				const saveData: any = {
					name_f: context.getNodeParameter('nameF', itemIndex) as string,
					name_s: context.getNodeParameter('nameS', itemIndex) as string,
					email: context.getNodeParameter('email', itemIndex) as string,
				};

				// Add optional fields only if they have values
				const phone = context.getNodeParameter('phone', itemIndex) as string;
				const phone2 = context.getNodeParameter('phone2', itemIndex) as string;
				const parentClientId = context.getNodeParameter('parentClientId', itemIndex) as number;
				const locationId = context.getNodeParameter('locationId', itemIndex) as number;
				const stateId = context.getNodeParameter('stateId', itemIndex) as number;
				const fax = context.getNodeParameter('fax', itemIndex) as string;
				const addSmsPhone1 = context.getNodeParameter('addSmsPhone1', itemIndex) as string;
				const addSmsPhone2 = context.getNodeParameter('addSmsPhone2', itemIndex) as string;
				const birthday = context.getNodeParameter('birthday', itemIndex) as string;
				const sex = context.getNodeParameter('sex', itemIndex) as string;
				const idNum = context.getNodeParameter('idNum', itemIndex) as string;
				const cityOther = context.getNodeParameter('cityOther', itemIndex) as string;
				const index = context.getNodeParameter('index', itemIndex) as string;
				const address = context.getNodeParameter('address', itemIndex) as string;
				const password = context.getNodeParameter('password', itemIndex) as string;
				const comment = context.getNodeParameter('comment', itemIndex) as string;
				const extAccId = context.getNodeParameter('extAccId', itemIndex) as number;
				const invoiceIdNum = context.getNodeParameter('invoiceIdNum', itemIndex) as string;
				const invoiceName = context.getNodeParameter('invoiceName', itemIndex) as string;

				if (phone) saveData.phone = phone;
				if (phone2) saveData.phone2 = phone2;
				if (parentClientId) saveData.parent_client_id = parentClientId;
				if (locationId) saveData.location_id = locationId;
				if (stateId) saveData.state_id = stateId;
				if (fax) saveData.fax = fax;
				if (addSmsPhone1) saveData.add_sms_phone1 = addSmsPhone1;
				if (addSmsPhone2) saveData.add_sms_phone2 = addSmsPhone2;
				if (birthday) saveData.birthday = birthday;
				if (sex) saveData.sex = sex;
				if (idNum) saveData.id_num = idNum;
				if (cityOther) saveData.city_other = cityOther;
				if (index) saveData.index = index;
				if (address) saveData.address = address;
				if (password) saveData.password = password;
				if (comment) saveData.comment = comment;
				if (extAccId) saveData.ext_acc_id = extAccId;
				if (invoiceIdNum) saveData.invoice_id_num = invoiceIdNum;
				if (invoiceName) saveData.invoice_name = invoiceName;

				// Handle tags
				const tags = context.getNodeParameter('tags', itemIndex) as any;
				if (tags && tags.tagValues && tags.tagValues.length > 0) {
					saveData.tags = tags.tagValues.map((tag: any) => ({
						tag_id: tag.tagId,
						tag_value: tag.tagValue
					}));
				}

				// Handle additional fields
				const additionalFields = context.getNodeParameter('additionalFields', itemIndex) as any;
				if (additionalFields && additionalFields.fieldValues && additionalFields.fieldValues.length > 0) {
					saveData.additional_fields = additionalFields.fieldValues.map((field: any) => ({
						field_id: field.fieldId,
						field_value: field.fieldValue
					}));
				}

				return await context.helpers.httpRequest({
					method: 'POST',
					url: `${baseUrl}/clients`,
					body: saveData,
				});

			default:
				throw new NodeOperationError(context.getNode(), `Unknown operation: ${operation}`);
		}
	}
}
