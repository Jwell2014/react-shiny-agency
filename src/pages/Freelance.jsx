import React from 'react';
import Card from '../components/Card';
import DefaultPicture from '../images/profile.png';

const Freelance = () => {

    const freelanceProfiles = [
        {
            name: 'Jane Doe',
            jobTitle: 'Devops',
            picture: DefaultPicture,
        },
        {
            name: 'John Doe',
            jobTitle: 'Developpeur frontend',
            picture: DefaultPicture,
        },
        {
            name: 'Jeanne Biche',
            jobTitle: 'Développeuse Fullstack',
            picture: DefaultPicture,
        },
    ]

    return (
        <div>
            <h1>Page freelance</h1>
            {freelanceProfiles.map((profil, index) => 
                (<Card 
                key={`${profil.name}-${index}`}
                label={`${profil.name}`}
                title={`${profil.jobTitle}`}
                picture={`${profil.picture}`}

                />)
            )}
        </div>
    );
};

export default Freelance;