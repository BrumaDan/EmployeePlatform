import axios from 'axios'
import useAuthStore from '../store/AuthStore';
import { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';

type Location = {
    id:string,
    name: string,
    description: string,
    streetNumber: number,
    street: string,
    city: string,
    postalCode:string

}
function Home() {
    const token = useAuthStore((state) => state.token);
    const setUserName = useAuthStore((state) => state.setUserName);
    const userName = useAuthStore((state) => state.userName);
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/employee',
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then(res => setUserName(res.data.userName)).catch(err => console.log(err));
    }, [token])


    const getLocations = () => {
        axios({
            method: 'get',
            url: '/api/location',
            headers: { Authorization: `Bearer ${token}` }
        }
        ).then(res => { setLocations(res.data); console.log(res.data) }).catch(err => console.log(err));
    }
  
    return (
      <Container>
      <p>Hello world! {`Username: ${userName}`}</p>
            {locations.map(location =>             
                <Container key={location.id}>
                    <h4>`Name: {location.name}`</h4>
                    <p>`Description: {location.description }`</p>
                    <p>`Street: {location.street}`</p>
                    <p>`Number: {location.streetNumber}`</p>
                    <p>`City: {location.city}`</p>
                    <p>`Postal Code: { location.postalCode}`</p>
                </Container>
            )}
            <Button variant='outlined' color='primary' onClick={getLocations}>Get Locations</Button>
            <Button variant='outlined' color='primary' onClick={()=>setLocations([])}>Hide Locations</Button>
        </Container>
    
  );
}

export default Home;