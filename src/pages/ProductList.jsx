import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductService from "../services/productService";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NumericInput from "react-numeric-input";
import { BorderBottom, Style } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductList(props) {
  const [products, setProducts] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  let productService = new ProductService();

  useEffect(() => {
    console.log(props.searchTerm)
    if (props.searchTerm == "") {
      productService.getProductsList().then((result) => {
        setProducts(result.data.products);
        console.log(result.data);
      });
    } else if (props.searchTerm != "") {
      console.log(props.searchTerm)
      productService.getProductsList().then((result) => {
        setProducts(
          result.data.products.filter((item) => {console.log(item.title)
          return item.title.toLowerCase().includes(props.searchTerm.toLowerCase());
          })
        );
      });
    }
  }, [props.searchTerm]);

  function addToCart(id, quantity) {
    const cartArr = [{ id, quantity }];
    console.log(cartArr);
    let cartResult = productService.addToCart(cartArr);
    let carts = [...cart];
    cartResult.then((result) => {
      carts.push(result.data);
      setCart(carts);
    });
    console.log(id, quantity);
  }
  console.log(cart);

  useEffect(() => {
    let totalPrice = 0;
    cart.map((cart) => {
      totalPrice += cart.total;
    });
    setTotalPrice(totalPrice);
  }, [cart]);

  async function deleteFunc(id) {
    console.log(id);
    await productService.deleteProduct(id);
    const arr = products.filter((products) => products.id != id);
    setProducts(arr);
  }

  function amount(amount) {
    console.log(amount);
    setAmounts(amount);
  }

  return (
    <div className="container">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Stock</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Rating</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button style={{ backgroundColor: "white" }}>
                      Add New Product
                    </Button>
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell component="th" scope="row">
                      {product.title}
                    </StyledTableCell>
                    <StyledTableCell>{product.price}</StyledTableCell>
                    <StyledTableCell>{product.stock}</StyledTableCell>
                    <StyledTableCell>{product.category}</StyledTableCell>
                    <StyledTableCell>{product.rating}</StyledTableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteFunc(product.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ShoppingCartIcon />}
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                          addToCart(product.id, amounts);
                        }}
                      ></Button>
                      <NumericInput
                        className="input"
                        min={0}
                        max={100}
                        placeholder="Amount"
                        onChange={(e) => amount(e)}
                      />
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={4}>
          <TableContainer>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Titel</StyledTableCell>
                  <StyledTableCell>Quantity</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((cart) => (
                  <TableRow key={Math.random()}>
                    <TableCell>{cart.products[0].title}</TableCell>
                    <TableCell>{cart.products[0].quantity}</TableCell>
                    <TableCell>{cart.products[0].price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total Price</TableCell>
                  <TableCell>{totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
