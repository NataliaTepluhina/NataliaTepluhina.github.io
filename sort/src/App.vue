<template>
    <div id="app">
        <div class="container">
            <button class="btn btn-primary" @click="getData">Get Data</button>

            <pagination for="orders" :records="orders.length" :per-page="10"></pagination>

            <table v-if="orders.length" class="table">
                <tbody>
                <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Ship Country</th>
                    <th>Ship City</th>
                    <th>Currency</th>
                    <th>Ship Date</th>
                    <th>Latitude</th>
                    <th>Status</th>
                    <th>Type</th>
                </tr>
                <tr v-for="order in currentOrders">
                    <td>{{ order.RecordID }}</td>
                    <td>{{ order.OrderID }}</td>
                    <td>{{ order.ShipCountry }} - {{ order.ShipCity }}</td>
                    <td>{{ order.ShipCity }}</td>
                    <td>{{ order.Currency }}</td>
                    <td>{{ order.ShipDate }}</td>
                    <td>{{ order.Latitude }}</td>
                    <td>{{ statuses[order.Status - 1] }}</td>
                    <td>{{ types[order.Type - 1] }}</td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    import {Pagination, PaginationEvent} from 'vue-pagination-2';
    export default {
        data() {
            return {
                orders: [],
                currentOrders: [],
                statuses: ['Pending', 'Delivered', 'Canceled', 'Success', 'Info', 'Danger'],
                types: ['Online','Retail', 'Direct'],

            }
        },

        components: {
            Pagination,
        },

        methods: {
            getData() {
                this.resource.fetchData()
                    .then(response => response.json())
                    .then(data => {
                        this.orders = data.data;
                        for (let i = 0; i < 10; i++) {
                            this.currentOrders.push(this.orders[ i ])
                        }
                    })
            }
        },

        created() {
            const customActions = {
                fetchData: { method: 'GET'}
            };
            this.resource = this.$resource('default.php', {}, customActions);
            PaginationEvent.$on('vue-pagination::orders', page => {
                this.currentOrders = [];
                for (let i = 0; i < 10; i++) {
                    this.currentOrders.push(this.orders[ i + (page - 1) * 10 ])
                }
            });
        }
    }

</script>

<style lang="scss">

</style>
