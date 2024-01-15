import {  useMemo, useState } from 'react';
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
import useSWR from "swr";
import useAuthStore from '../../store/AuthStore';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const validateRequired = (value: string) => !!value.length;
const validateInteger = (intValue: string) => Number.isNaN(parseInt(intValue))
   

function validateLocation(location: Location) {
    console.log(location)
    return {
        name: !validateRequired(location.name)
            ? 'Name is Required'
            : '',
        description: !validateRequired(location.description) ? 'Description is Required' : '',
        city: !validateRequired(location.city) ? 'City is Required' : '',
        street: !validateRequired(location.street) ? 'Street is Required' : '',
        streetNumber: validateInteger(location.streetNumber) ? 'Incorrect Data Type' : '',
        postalCode: validateInteger(location.postalCode) ?'Incorrect Data Type': '',
    };
}

type Location = {
    id:string,
    name: string,
    description: string,
    streetNumber: string,
    street: string,
    city: string,
    postalCode:string
}

//function useCreateUser() {
   
    
//    return useMutation({
//        mutationFn: async (user: User) => {
//            //send api update request here
//            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//            return Promise.resolve();
//        },
//        //client side optimistic update
//        onMutate: (newUserInfo: User) => {
//            queryClient.setQueryData(
//                ['users'],
//                (prevUsers: any) =>
//                    [
//                        ...prevUsers,
//                        {
//                            ...newUserInfo,
//                            id: (Math.random() + 1).toString(36).substring(7),
//                        },
//                    ] as User[],
//            );
//        },
//        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//    });
//}
//READ hook (get users from api)
//function useGetUsers() {
//    return useQuery<User[]>({
//        queryKey: ['users'],
//        queryFn: async () => {
//            //send api request here
//            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//            return Promise.resolve(fakeData);
//        },
//        refetchOnWindowFocus: false,
//    });
//}

//UPDATE hook (put user in api)
//function useUpdateUser() {
//    const queryClient = useQueryClient();
//    return useMutation({
//        mutationFn: async (user: User) => {
//            //send api update request here
//            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//            return Promise.resolve();
//        },
//        //client side optimistic update
//        onMutate: (newUserInfo: User) => {
//            queryClient.setQueryData(
//                ['users'],
//                (prevUsers: any) =>
//                    prevUsers?.map((prevUser: User) =>
//                        prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//                    ),
//            );
//        },
//        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//    });
//}

//DELETE hook (delete user in api)
//function useDeleteUser() {
//    const queryClient = useQueryClient();
//    return useMutation({
//        mutationFn: async (userId: string) => {
//            //send api update request here
//            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//            return Promise.resolve();
//        },
//        //client side optimistic update
//        onMutate: (userId: string) => {
//            queryClient.setQueryData(
//                ['users'],
//                (prevUsers: any) =>
//                    prevUsers?.filter((user: User) => user.id !== userId),
//            );
//        },
//        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//    });fetcher
//}

const LocationsHomePage = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
        >({});
    const userToken = useAuthStore((state) => state.token);
    //const [data, setData] = useState<Location[]>([]) 
    const config = {
        headers: {
            'Authorization': `Bearer ${userToken}`,            
        }
    }

    const fetcher = (url: string) => fetch(url, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        }
    }).then((response) => response.json());
    

   
    const { data, error, isLoading , mutate } = useSWR("/api/Location", (url: string) => fetcher(url), { fallbackData: {data:[]} });    
   
    const columns = useMemo<MRT_ColumnDef<Location>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: 'name',
                header: 'Name',
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
                accessorKey: 'description',
                header: 'Description',
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
                accessorKey: 'streetNumber',
                header: 'Street Number',
                muiEditTextFieldProps: {
                    type: 'int',
                    required: true,
                    error: !!validationErrors?.streetNumber,
                    helperText: validationErrors?.streetNumber,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            streetNumber: undefined,
                        }),
                },
            },
            {
                accessorKey: 'street',
                header: 'Street',
                muiEditTextFieldProps: {
                    type: 'int',
                    required: true,
                    error: !!validationErrors?.street,
                    helperText: validationErrors?.street,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            street: undefined,
                        }),
                },
            },
            {
                accessorKey: 'city',
                header: 'City',
                muiEditTextFieldProps: {
                    type: 'string',
                    required: true,
                    error: !!validationErrors?.city,
                    helperText: validationErrors?.city,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            city: undefined,
                        }),
                },
            },
            {
                accessorKey: 'postalCode',
                header: 'Postal Code',
                muiEditTextFieldProps: {
                    type: 'int',
                    required: true,
                    error: !!validationErrors?.postalCode,
                    helperText: validationErrors?.postalCode,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            postalCode: undefined,
                        }),
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    //const { mutateAsync: createUser, isPending: isCreatingUser } =
    //    useCreateUser();
    //call READ hook
    //const {
    //    data: fetchedUsers = [],
    //    isError: isLoadingUsersError,
    //    isFetching: isFetchingUsers,
    //    isLoading: isLoadingUsers,
    //} = useGetUsers();
    //call UPDATE hook
    //const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    //    useUpdateUser();
    //call DELETE hook
    //const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    //    useDeleteUser();

    //CREATE action
    const handleCreateUser: MRT_TableOptions<Location>['onCreatingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateLocation(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});            
        axios.post('/api/Location', { ...values, id:`00000000-0000-0000-0000-000000000000` } , config)
            .then(res => { mutate({ ...data, values }); console.log(res) })
            .catch(err => { console.log(`${err.response.data}`) })         
        //console.log(values)
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveUser: MRT_TableOptions<Location>['onEditingRowSave'] = async ({
        values,
        table,
    }) => {
        const newValidationErrors = validateLocation(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});    
        console.log(values);
        axios.put(`/api/Location/${values.id}`, {...values}, config)
            .then(res => { mutate({ ...data, values }); console.log(res) })
            .catch(err => { console.log(`${err.response.data}`) })    
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
        getRowId: (row) => row.id,
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
                <DialogTitle variant="h3">Create New Location</DialogTitle>
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
                <DialogTitle variant="h3">Edit Location</DialogTitle>
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
                Create New Location
            </Button>
        ),
        state: {
            isLoading: isLoading,
            //isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
            showAlertBanner: error,
            showProgressBars: isLoading,
        },
    });


    return    <MaterialReactTable table={table} />;    
        
    
};
export default LocationsHomePage