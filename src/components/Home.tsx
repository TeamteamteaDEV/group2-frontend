import React, { useEffect, useState } from 'react';
import API from '../API';
import ButtonOverlay from './ButtonOverlay';
import AddButton from './Buttons/AddButton';
import ProjectList from './Project/ProjectList';

//components
import Headbar from './Headbar';
import NoContent from './NoContent';

// images
import Budda from '../images/budda.png';

interface HomeProps {
  setProjectId: Function;
}

const initialState: any = [];

const Home: React.FC<HomeProps> = ({ setProjectId }) => {
  const [showButtonOverlay, setShowButtonOverlay] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(initialState);

  useEffect(() => {
    const fetchProj = async () => {
      const proj: any = await API.fetchProjects();
      setProjects(proj);
    };
    fetchProj();
  }, []);

  console.log(projects);

  return (
    <>
      <Headbar header="dreamteam101" />
      <h2 className="main-title">Recent Projects</h2>
      {(projects.length > 0)
        ? <ProjectList projects={projects} setProjectId={setProjectId} />
        : <NoContent
          heading="Team Project shows here"
          subheading={`There are no projects\nin your team right now`}
          image={Budda} />
      }
      <AddButton callback={() => setShowButtonOverlay(!showButtonOverlay)} />
      <ButtonOverlay
        showOverlay={showButtonOverlay}
        callback={() => setShowButtonOverlay(false)}
      />
    </>
  );
};

export default Home;
