import React, {useState} from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = (props) => {

	const [open, setOpen] = useState(false);

	function toggleNavbar() {
		setOpen(!open);
	}

	return (
		<header>
			<Navbar className="navbar-expand-sm navbar-toggleable-sm  mb-3">
				<Container>
					<NavbarBrand tag={Link} to="/">cs_rdf</NavbarBrand>
					<NavbarToggler onClick={toggleNavbar} className="mr-2" />
					
				</Container>
			</Navbar>
		</header>
	)
}

export default NavMenu;