// Dependencias
import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalState from './Context/GlobalState';
import './App.css';

// Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css";
import Container from 'react-bootstrap/Container';

// Paginas
import Home from "./Pages/Home";
import Login from "./Pages/User/Login";
import Logout from "./Pages/User/Logout";
import Purchases from "./Pages/User/Purchases";
import Register from "./Pages/User/RegisterPage";
import NavbarMenu from "./Components/NavbarMenu";
import Products from "./Pages/Products";
import ProductsAdmin from "./Pages/Admin/ProductsAdmin";
import ProductABM from "./Pages/Admin/ProductABM";
import Product from "./Pages/Product";
//import Migrate from "./Pages/Migrate";
import NoMatch from "./Pages/Misc/NoMatch";

function App() {
	// <Route path="/migrate" exact component={Migrate} />
	return (
		<GlobalState>
			<BrowserRouter>
				<NavbarMenu />
				<Container className="bg-light p-4" style={{ minHeight: 'calc(100vh - 56px)'}} >
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/login" exact component={Login} />
						<Route path="/logout" exact component={Logout} />
						<Route path="/registro" exact component={Register} />
						<Route path="/purchases" exact component={Purchases} />
						<Route path="/admin" exact component={ProductsAdmin} />
						<Route path="/admin/producto" exact component={ProductABM} />
						<Route path="/admin/producto/:id" exact component={ProductABM} />
						<Route path="/productos" exact component={Products} />
						<Route path="/producto/:id" exact component={Product} />
						<Route path="*" exact component={NoMatch} />
					</Switch>
				</Container>
			</BrowserRouter>
		</GlobalState>
	);
}

export default App;
