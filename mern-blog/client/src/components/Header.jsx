import { Avatar, Button, Dropdown, DropdownItem, Navbar,  TextInput } from 'flowbite-react'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import React from 'react';
import {AiOutlineSearch }from 'react-icons/ai';
import{FaMoon}from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';


export default function Header() {
  //for activing the path name 
  const path=useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {currentUser}=useSelector(state=>state.user);
  const {theme}=useSelector((state)=>state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };



  return (
    //IMPORTANT CONCEPT 
    // -->Link to  method
    // -->flowbite -react 
    // -->'hidden lg:inline'
    //-->lg:hidden
    //-->Navbar.collapse
    //-><Navbar.Link active={path=== "/project" } > <Link to='/project'>Projects</Link></Navbar.Link> 
    //-->hidden sm:inline
    //-->outline

    <Navbar className='border-b-2'>
      {/* abhinav blog */}
      <Link to="/" className='self -center whitespace-nowrap text-sm sm:text-xl
      font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Vipul</span>
        Blog
      </Link>


      {/* //search  */}
      <form onSubmit={handleSubmit}>
        <TextInput
        type='text'
        placeholder='search...'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </form>
      

      {/* //responsive search  */}
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch/>
      </Button>

      {/* sigin + Famoon */}
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill  onClick={()=>dispatch(toggleTheme())}>
          <FaMoon />
        </Button>

        {currentUser ? (
            <Dropdown arrowIcon={false}
              inline
              label={<Avatar
                alt='user'
                img={currentUser.profilePicture}  
                rounded
              />}
            >
              <Dropdown.Header>
                <span  className='block text-sm'>@{currentUser.username}</span>
                <span  className='block text-sm font-medium truncate'>{currentUser.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <DropdownItem> Profile</DropdownItem>
                </Link>
                <Dropdown.Divider/>
                <DropdownItem onClick={handleSignout}>Sign Out</DropdownItem>



            </Dropdown>
          ): (
            <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue'outline  pill>
              Sign In
            </Button>
          </Link>
          )
        }
        
       
       <Navbar.Toggle/>
    </div>



    {/* //this part home +about+project  */}
      <Navbar.Collapse>
        {/* active={path=== "/" }-->yeh use kiyen hain to active the link for their particular routes ke liye */}

          <Navbar.Link active={path=== "/" }>
            <Link to='/'>
              Home
            </Link>
            </Navbar.Link>
            <Navbar.Link  active={path=== "/about" } >
            <Link to='/about'>
              About
            </Link>
            </Navbar.Link>
            <Navbar.Link active={path=== "/project" } >
            <Link to='/project'>
              Projects
            </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
