import './Footer.css';
import '../../../App.css';
import { FcCopyright } from 'react-icons/fc';
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { SiReact } from'react-icons/si';


const Footer = () => {


  const antonio = {
    name: "Antonio Mata Gil de Rozas",
    linkedin: "https://www.linkedin.com/in/antonio-mata-gil-de-rozas/",
  };

  const danielys = {
    name: "Danielys Alexandra García Mejías",
    linkedin: "https://www.linkedin.com/in/danielys-alexandra-garcia-mejias/",
  }

  const talita = {
    name: "Talita Alves Gomes",
    linkedin: "https://www.linkedin.com/in/talitaalvesgomes/",
  }

  return (
    <div className='footer-container'>
      <h5><SiReact /> REACT APP PROYECT CREATED BY:</h5>
      <p><AiFillLinkedin /> <a className='footer-link' href={antonio.linkedin} target="_blank" rel="noreferrer noopener">{antonio.name}</a> | <AiFillLinkedin /> <a className='footer-link' href={danielys.linkedin} target="_blank" rel="noreferrer noopener">{danielys.name}</a> | <AiFillLinkedin /> <a className='footer-link' href={talita.linkedin} target="_blank" rel="noreferrer noopener">{talita.name}</a>.</p>
      <p><AiOutlineGithub /> GitHub Project <a className='github-link' href='https://github.com/Antonio-Mata-Gil/trabajo-final' target="_blank" rel='noreferrer noopener'>Repository</a></p>
      <p><FcCopyright /> Musify 2023</p>
    </div>
  )
}

export default Footer