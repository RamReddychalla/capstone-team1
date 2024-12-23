import { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    // Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
const AddCreditCard = ({ open, onClose, onAddCard, existingCards }) => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        nameOnCard: "",
        valid_from: "",
        expiry: "",
        cvv: "",
        wireTransactionVendor: "",
        status: "enabled",
    });

    const [errors, setErrors] = useState({});

    const wireTransactionVendors = ["VISA", "AMEX", "Rupay", "MasterCard"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "cardNumber") {
            // Dynamically format the card number with dashes
            const formattedValue = value
                .replace(/\D/g, "") // Remove non-digits
                .replace(/(\d{4})(?=\d)/g, "$1-")
                .slice(0, 19);
            setFormData({ ...formData, [name]: formattedValue });
        }
        else if (name === "cvv") {
            const formattedValue = value
                .replace(/\D/g, "")
                .slice(0, 3);
            setFormData({ ...formData, [name]: formattedValue });
        }
        else if (name === "valid_from" || name === "expiry") {
            const formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(?=\d)/g, "$1/")
                .slice(0, 5)
            setFormData({ ...formData, [name]: formattedValue });
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (
            !formData.cardNumber ||
            formData.cardNumber.length !== 19 ||
            formData.cardNumber === "0000-0000-0000-0000" ||
            // eslint-disable-next-line react/prop-types
            existingCards.some((card) => card.cardNumber === formData.cardNumber)
        ) {
            alert("Invalid or duplicate card number.");
            return false;
        }

        // Validate card number
        const plainCardNumber = formData.cardNumber.replace(/-/g, "");
        if (!/^\d{16}$/.test(plainCardNumber)) {
            newErrors.cardNumber = "Card number must be exactly 16 digits.";
        } else if (plainCardNumber === "0000000000000000") {
            newErrors.cardNumber = "Card number cannot be all zeros.";
            // eslint-disable-next-line react/prop-types
        } else if (existingCards.includes(plainCardNumber)) {
            newErrors.cardNumber = "Card number must be unique.";
        }

        // Validate Name on Card
        if (!formData.nameOnCard.trim()) {
            newErrors.nameOnCard = "Name on card is required.";
        }

        // Validate Valid From
        if (!/^\d{2}\/\d{2}$/.test(formData.valid_from)) {
            newErrors.valid_from = "Valid From must be in MM/YY format.";
        }

        // Validate Expiry
        if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
            newErrors.expiry = "Expiry must be in MM/YY format.";
        }

        // Validate CVV
        if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = "CVV must be exactly 3 digits.";
        }

        // Validate wireTransactionVendor
        if (!formData.wireTransactionVendor) {
            newErrors.wireTransactionVendor = "wireTransactionVendor selection is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const plainCardNumber = formData.cardNumber.replace(/-/g, " ");
            onAddCard({ ...formData, cardNumber: plainCardNumber });
            setFormData({
                cardNumber: "",
                nameOnCard: "",
                valid_from: "",
                expiry: "",
                cvv: "",
                wireTransactionVendor: "",
                status: "enabled",
            });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add Credit Card</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        helperText={errors.cardNumber}
                        error={!!errors.cardNumber}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name on Card"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        helperText={errors.nameOnCard}
                        error={!!errors.nameOnCard}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Valid From (MM/YY)"
                        name="valid_from"
                        value={formData.valid_from}
                        onChange={handleInputChange}
                        helperText={errors.valid_from}
                        error={!!errors.valid_from}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Expiry (MM/YY)"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        helperText={errors.expiry}
                        error={!!errors.expiry}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        helperText={errors.cvv}
                        error={!!errors.cvv}
                        type="password"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="wireTransactionVendor"
                        name="wireTransactionVendor"
                        select
                        value={formData.wireTransactionVendor}
                        onChange={handleInputChange}
                        helperText={errors.wireTransactionVendor}
                        error={!!errors.wireTransactionVendor}
                    >
                        {wireTransactionVendors.map((wireTransactionVendor) => (
                            <MenuItem key={wireTransactionVendor} value={wireTransactionVendor}>
                                {wireTransactionVendor}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Card
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCreditCard;
