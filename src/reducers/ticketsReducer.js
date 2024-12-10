import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ticketService } from '../services/apiServiceFactory'


const initialState = {
    data: [],
    loading: false,
    error: null,
};


const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        appendTicket(state, action) {
            state.push(action.payload)
        },
        setTickets(state, action) {
            return action.payload
        },
        update(state, action) {
            return state.map(ticket =>
                ticket.id !== action.payload.id ? ticket : action.payload
            )
        },
        updateField(state, action) {
            return state.map(ticket =>
                ticket.id !== action.payload.id ? ticket : { ...ticket, [action.payload.field]: action.payload.value }
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialiseTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(initialiseTickets.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(initialiseTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export const initialiseTickets = createAsyncThunk(
    'tickets/initialiseTickets',
    async (_, { rejectWithValue }) => {
        try {
            const tickets = await ticketService.getAll()
            return tickets;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    })


export const createTicket = (ticket) => {
    return async (dispatch) => {
        const newTicket = await ticketService.create(ticket)
        dispatch(appendTicket(newTicket))
    }
}


export const updateTicket = (id, ticket) => {
    return async (dispatch) => {
        const updatedTicket = await ticketService.update(id, ticket)
        dispatch(update(updatedTicket))
    }
}

export const updateTicketField = (id, field, value) => {
    return async (dispatch) => {
        const updatedTicket = await ticketService.update(id, { [field]: value })
        dispatch(updateTicketField({ id, field, value: updatedTicket[field] }))
    }
}

export const { updateField, appendTicket, setTickets, update } = ticketsSlice.actions
export default ticketsSlice.reducer