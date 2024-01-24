
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
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Tooltip,
} from '@mui/material';
//import useSWR from "swr";
import { useAuthStore } from '../../store/AuthStore';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';


const validateRequired = (value: string) => !!value.length;

function validateUser(user: User) {
    console.log(user)
    return {
        FirtName: !validateRequired(user.FirstName)
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
    Role:string[]
}



const EmployeesHomePage = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});
    const userToken = useAuthStore((state) => state.token);
    const [data, setData] = useState<User[]>([])
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    }

    useEffect(() => {
        axios.get("/api/Account/users", config).then(res => { setData(res.data);console.log(res)}).catch(err => console.log(err))
    }, [])

    //const getLocationsUrl = "/api/Location";
    //const { data, mutate, error, isLoading } = useSWR(getLocationsUrl, (url: string) => fetcher(url));
    //const { data, error, isLoading } = useSWR(getLocationsUrl, (url: string) => fetcher(url));    
    //console.log(data)
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'userName',
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
                accessorKey: 'password',
                header: 'Password',
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
                accessorKey: 'firstName',
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
                accessorKey: 'lastName',
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
            {
                accessorKey: 'role',
                header: 'User Role',
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
        ],
        [validationErrors],
    );



    //CREATE action
    const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        axios.post('/api/Account/register', { ...values }, config)
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
        data: data,
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
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h3">Edit User</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    {internalEditComponents} {/* or render custom edit components here */}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
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