import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";

function CheckoutForm() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [paying, setPaying] = useState(false);

    const paymentSuccess = () => {
        navigate('/orders'); // Redirect to orders page after successful payment
    };

    async function handlePay(e) {
        e.preventDefault();
        if (user.cart.count <= 0 || address.trim() === "" || country.trim() === "") {
            setAlertMessage("Please fill out all fields.");
            return;
        }

        setPaying(true);
        // Simulate payment processing delay
        setTimeout(() => {
            setPaying(false);
            // Assume payment is successful and create an order
            createOrder({ userId: user._id, cart: user.cart, address, country }).then((res) => {
                if (!isLoading && !isError) {
                    setAlertMessage("Payment successful! Redirecting to orders page...");
                    setTimeout(() => {
                        paymentSuccess();
                    }, 3000);
                }
            });
        }, 2000); // Simulating 2 seconds payment processing time
    }

    return (
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                <Row>
                    {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isSuccess}>
                    {paying ? "Reserving..." : "Reserve"}
                </Button>
            </Form>
        </Col>
    );
}

export default CheckoutForm;
