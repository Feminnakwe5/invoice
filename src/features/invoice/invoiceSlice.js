import { apiSlice } from '../api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const invoiceAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = invoiceAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoice: builder.query({
      query: () => '/invoice',
      transformResponse: (res) => invoiceAdapter.setAll(initialState, res),
      providesTags: ['invoice'],
    }),
    getInvoiceByID: builder.query({
      query: (id) => `/invoice/?userId=${id}`,
      transformResponse: (res) => invoiceAdapter.setAll(initialState, res),
      providesTags: ['invoice'],
    }),
    addInvoice: builder.mutation({
      query: (invoice) => ({
        url: '/invoice',
        method: 'POST',
        body: invoice,
      }),
      invalidatesTags: ['invoice'],
    }),
    updateInvoice: builder.mutation({
      query: (invoice) => ({
        url: `/invoice/${invoice.id}`,
        method: 'PATCH',
        body: invoice,
      }),
      invalidatesTags: ['invoice'],
    }),
    deleteInvoice: builder.mutation({
      query: ({ id }) => ({
        url: `/invoice/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['invoice'],
    }),
  }),
});

export const {
  useGetInvoiceQuery,
  useGetInvoiceByIDQuery,
  useAddInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
} = extendedApiSlice;

export const selectInvoiceResult =
  extendedApiSlice.endpoints.getInvoice.select();

const selectInvoiceData = createSelector(
  selectInvoiceResult,
  (invoiceResult) => invoiceResult.data
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllInvoice,
  selectById: selectInvoiceById,
  selectIds: selectInvoiceIds,
  // Pass in a selector that returns the posts slice of state
} = invoiceAdapter.getSelectors(
  (state) => selectInvoiceData(state) ?? initialState
);
