import { useParams } from 'react-router-dom';

import { BaseLayout } from '../layouts';
import { ShowDetails } from '../components/tv-shows';


const ShowPage = () => {
  const { id } = useParams();
  return (
    <BaseLayout>
      <ShowDetails id={id}/>
    </BaseLayout>
  );
};

export default ShowPage;