import {  useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    //createRow,
    type MRT_ColumnDef,
    //type MRT_Row,
    type MRT_TableOptions,
    useMaterialReactTable,
    MRT_Row,
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
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import fetcher from '../Common/fetcher';



const validateRequired = (value: string) => !!value.length;
const validateInteger = (intValue: string) => Number.isNaN(parseInt(intValue))
   

function validateLocation(location: Location) {    
    return {
        name: !validateRequired(location.Name)
            ? 'Name is Required'
            : '',
        description: !validateRequired(location.Description) ? 'Description is Required' : '',
        city: !validateRequired(location.City) ? 'City is Required' : '',
        street: !validateRequired(location.Street) ? 'Street is Required' : '',
        streetNumber: validateInteger(location.StreetNumber) ? 'Incorrect Data Type' : '',
        postalCode: validateInteger(location.PostalCode) ?'Incorrect Data Type': '',
    };
}

type Location = {
    Id:string,
    Name: string,
    Description: string,
    StreetNumber: string,
    Street: string,
    City: string,
    PostalCode:string
}

const LocationsHomePage = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
        >({});
    //const userToken = useAuthStore((state) => state.token);

    const locationURL = "/api/Location";    
    const { data, error, isLoading, mutate } = useSWR(locationURL, (url: string) => fetcher(url), { fallbackData: { data: [] }});    
   
    const columns = useMemo<MRT_ColumnDef<Location>[]>(
        () => [         
            {
                accessorKey: 'Name',
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
                accessorKey: 'Description',
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
                accessorKey: 'StreetNumber',
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
                accessorKey: 'Street',
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
                accessorKey: 'City',
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
                accessorKey: 'PostalCode',
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
        axios.post('/api/Location', { ...values})
            .then(res => { mutate({ ...data, values }); console.log(res) })
            .catch(err => { console.log(`${err.response.data}`) })                 
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
        axios.put(`/api/Location/${values.Id}`, {...values})
            .then(res => { mutate({ ...data, values }); console.log(res) })
            .catch(err => { console.log(`${err.response.data}`) })    
        table.setEditingRow(null); //exit editing mode
    };


   
    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Location>) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.Id);
          
        }
    };
    function deleteUser(id: string) {
        axios.delete(`/api/Location/${id}`)
            .then(res => {
                mutate({ ...data, data });
                console.log(res);
            })
            .catch(err => {
                console.log(`${err.response.data}`);
            });
    }

    const table = useMaterialReactTable({
        columns,
        data,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.Id,

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
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
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


    return <MaterialReactTable table={table} />
    
        
    
};
export default LocationsHomePage


