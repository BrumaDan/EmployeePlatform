
import { useEffect, useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    //createRow,
    type MRT_ColumnDef,
    //type MRT_Row,
    type MRT_TableOptions,
    useMaterialReactTable,
} from 'material-react-table';
import {
    Autocomplete,
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
//import useSWR from "swr";
import { useAuthStore } from '../../store/AuthStore';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import fetcher from '../Common/fetcher';
import useSWR from 'swr';


const validateRequired = (value: string) => !!value.length;

function validateUser(user: User) {
    return {
        FirstName: !validateRequired(user.FirstName)
            ? 'Name is Required'
            : '',
        LastName: !validateRequired(user.LastName) ? 'LasName is Required' : '',
    };
}

type User = {
    Id: string,
    UserName: string,
    Password:string,
    FirstName: string,
    LastName: string,
    Role: string[]
    Location: Location[]
}

type Location = { Name: string, Id: string, City: string }



const EmployeesHomePage = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const userToken = useAuthStore((state) => state.token);
    const [usersList, setUsersList] = useState<User[]>([])
    const [locationsOptions, setLocationOptions] = useState<Location[]>([])
    const [userToEdit, setUserToEdit] = useState<User|null>(null)
   

    //useEffect(() => {
    //    axios.get("/api/Account/users", config).then(res => { console.log(res.data); setUsersList(res.data) }).catch(err => console.log(err))
    //    axios.get("/api/Location", config).then(res => { setLocationOptions(res.data) }).catch(err => console.log(err))
    //}, [])

    const getUsersUrl = "/api/Account/users";
    const { data, mutate, error, isLoading } = useSWR(getUsersUrl, (url: string) => fetcher(url,userToken));
    //const { data, error, isLoading } = useSWR(getLocationsUrl, (url: string) => fetcher(url));    
    //console.log(data)
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'UserName',
                header: 'User Name',
                muiEditTextFieldProps: {
                    type: 'string',
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                /*     acaccessorFn: (row: User) => row.location.length ? row.location[0].name : "",*/
                accessorKey: 'Location',
                header: 'Locatie',
                editVariant: 'select',
                editSelectOptions: locationsOptions.map(location => location.Name /*{ return { label: location.name, text: location.id, value:location.name} }*/),
                muiEditTextFieldProps: {
                    select: true,
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'FirstName',
                header: 'First Name',
                muiEditTextFieldProps: {
                    type: 'string',
                    required: true,
                    error: !!validationErrors?.name,
                    helperText: validationErrors?.name,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'LastName',
                header: 'Last Name',
                muiEditTextFieldProps: {
                    type: 'string',
                    required: true,
                    error: !!validationErrors?.description,
                    helperText: validationErrors?.description,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            description: undefined,
                        }),
                },
            },
            //{
            //    accessorKey: 'role',
            //    header: 'User Role',
            //    muiEditTextFieldProps: {
            //        type: 'string',
            //        required: true,
            //        error: !!validationErrors?.description,
            //        helperText: validationErrors?.description,
            //        //remove any previous validation errors when user focuses on the input
            //        onFocus: () =>
            //            setValidationErrors({
            //                ...validationErrors,
            //                description: undefined,
            //            }),
            //    },
            //},
        ],
        [validationErrors],
    );



    //CREATE action
    const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
        values,
        table,
    }) => {
        console.log(values);
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});

        axios.post('/api/Account/register', { ...values, Password: `A${Math.random().toString(36).substring(2, 12)}`, Role:'Employee' }, config)
            .then(res => console.log(res))
            .catch(err => { console.log(`${err.response.data}`) })
        //console.log(values)
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        console.log(values)
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    //const openDeleteConfirmModal = (row: MRT_Row<Location>) => {
    //    if (window.confirm('Are you sure you want to delete this user?')) {
    //        deleteUser(row.original.id);
    //    }
    //};

    const table = useMaterialReactTable({
        columns,
        data: usersList,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.Id,
        //muiToolbarAlertBannerProps: isLoadingUsersError
        //    ? {
        //        color: 'error',
        //        children: 'Error loading data',
        //    }
        //    : undefined,
        //muiTableContainerProps: {
        //    sx: {
        //        minHeight: '500px',
        //    },
        //},
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Create New User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row }) => (
            <>
                {console.log(userToEdit)}
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
             
                    {/*          {internalEditComponents}  */}{/*or render custom edit components here */}
                    <TextField value={userToEdit?.FirstName} id="standard-basic" label="First Name" variant="standard" />
                    <TextField value={userToEdit?.LastName} id="standard-basic" label="Last Name" variant="standard"/>
                    <Autocomplete
                        onChange={(_e, value) => {
                            if (value && userToEdit) {
                                setUserToEdit({ ...userToEdit, Location: value });
                            }
                        }}
                        fullWidth={true}
                        disablePortal={true }
                        value={userToEdit?.Location}
                        multiple/*={userToEdit?.role.includes('Employee')}*/
                        isOptionEqualToValue={(option: Location, value: Location) => option.Id === value.Id}
                        getOptionLabel={(option: Location) => option.Name}
                        id="combo-box-demo"
                        options={locationsOptions}
                        renderInput={(params) => <TextField {...params} label="Locations" />}
                    />
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => { table.setEditingRow(row); setUserToEdit(row.original) }}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                {/*<Tooltip title="Delete">*/}
                {/*    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>*/}
                {/*        <DeleteIcon />*/}
                {/*    </IconButton>*/}
                {/*</Tooltip>*/}
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New User
            </Button>
        ),
       
    });
    /*table.setColumnVisibility({ Password: false });*/

    return <MaterialReactTable table={table} />;


};
export default EmployeesHomePage