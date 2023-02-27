import Card from '../components/Card';
import styled from 'styled-components';
import colors from '../utils/styles/colors';
import { Loader } from '../utils/styles/atoms';
import {useFetch, useTheme} from '../utils/hooks/callAPI';


const CardsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
font-size: 30px;
text-align: center;
padding-bottom: 30px;
color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const PageSubtitle = styled.h2`
font-size: 20px;
color: ${colors.secondary};
font-weight: 300;
text-align: center;
padding-bottom: 30px;
color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Freelance = () => {

  const {data, isLoading, error} = useFetch(`http://localhost:8000/freelances`);
  const {theme} = useTheme();
  // Ici le "?" permet de s'assurer que data existe bien.
  const freelancersList = data?.freelancersList;



// Permet de faire l'appel a l'API pour recuperer les données,
  //On l'affiche uniquement à la première initialisation de notre composant,
  //et on précise un tableau de dépendances vide dans notre fichier
  // useEffect(() => {
  //   async function fetchFreelances() {
  //     setDataLoading(true)
  //     try {
  //       const response = await fetch(`http://localhost:8000/freelances`)
  //       const { freelancersList } = await response.json()
  //       setFreelancesList(freelancersList)
  //     } catch (err) {
  //       console.log('===== error =====', err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchFreelances()
  // }, [])

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }


   


    return (
      <div>
       <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <LoaderWrapper>
          <Loader theme={theme} />
        </LoaderWrapper>
      ) : (
        <CardsContainer>
          {freelancersList.map((profile, id) => (
            <Card
              key={`${profile.name}-${id}`}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </CardsContainer>
      )}
    </div>
    );
};

export default Freelance;