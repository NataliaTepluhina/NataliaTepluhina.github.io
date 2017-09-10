<template>
    <div id="app">
        <div class="container">

            <h1 v-if="!orders.length">Error with getting data from server</h1>
            <hr>
            <div v-if="orders.length">
                <input type="text" v-model="searchParameter" placeholder="Search in list">
                <hr>
                <table class="table table-striped table-bordered">
                    <tbody>
                    <tr>
                        <th v-for="column in columns"
                            @click="sort(column.id)"
                            :class="{'active' : sortParameter === column.id, 'reverse': sortParameter === column.id && reverse}">
                            {{ column.text }}
                        </th>

                    </tr>
                    <tr v-for="order in currentOrders">
                        <td>{{ order.RecordID }}</td>
                        <td class="col-md-2">{{ order.OrderID }}</td>
                        <td class="col-md-2">{{ order.ShipCountry }} - {{ order.ShipCity }}</td>
                        <td class="col-md-2">{{ order.ShipCity }}</td>
                        <td class="col-md-1">{{ order.Currency }}</td>
                        <td class="col-md-1">{{ order.ShipDate }}</td>
                        <td class="col-md-1">{{ order.Latitude }}</td>
                        <td class="col-md-1">{{ statuses[order.Status - 1] }}</td>
                        <td class="col-md-1">{{ types[order.Type - 1] }}</td>
                    </tr>
                    </tbody>
                </table>

                <pagination ref="pagination" for="filteredOrders" :records="filteredOrders.length" :per-page="10"></pagination>
            </div>


        </div>

    </div>
</template>

<script>
    import {Pagination, PaginationEvent} from 'vue-pagination-2';
    export default {
        data() {
            return {
                orders: [],
                columns: [
                    {
                        id: 'RecordID',
                        text: '#'
                    },
                    {
                        id: 'OrderID',
                        text: 'Order ID'
                    },
                    {
                        id: 'ShipCountry',
                        text: 'Ship Country'
                    },
                    {
                        id: 'ShipCity',
                        text: 'Ship City'
                    },
                    {
                        id: 'Currency',
                        text: 'Currency'
                    },
                    {
                        id: 'ShipDate',
                        text: 'ShipDate'
                    },
                    {
                        id: 'Latitude',
                        text: 'Latitude'
                    },
                    {
                        id: 'Status',
                        text: 'Status'
                    },
                    {
                        id: 'Type',
                        text: 'Type'
                    },

                ],
                reverse: false,
                searchParameter: '',
                page: 1,
                keys: ['RecordID', 'OrderID', 'ShipCountry', 'ShipCity', 'Currency', 'ShipDate', 'Latitude'],
                sortParameter: '',
                statuses: ['Pending', 'Delivered', 'Canceled', 'Success', 'Info', 'Danger'],
                types: ['Online','Retail', 'Direct'],

            }
        },

        components: {
            Pagination,
        },

        methods: {
            sort (parameter) {
                this.reverse = this.sortParameter === parameter ? !this.reverse : false;
                this.sortParameter = parameter;
            }

        },

        computed: {
            filteredOrders() {
                let reverse = this.reverse ? 'desc' : 'asc';
                return _.orderBy(this.orders, this.sortParameter, reverse).filter(order => {
                    if (this.searchParameter) {
                        this.$refs['pagination'].setPage(1);
                        return Object.keys(order).some(key => {
                            if(order[key] && this.keys.indexOf(key) > -1) {
                                return order[key].toString().toLowerCase().includes(this.searchParameter.trim().toLowerCase());
                            }
                        });
                    }
                    else {
                        return true;
                    }
                });
            },

            currentOrders() {
                return this.filteredOrders.filter((element, index) => {
                    return (index  >= (this.page - 1) * 10) && (index  < this.page * 10);
                });
            }
        },

        created() {
            const customActions = {
                fetchData: { method: 'GET'}
            };
            this.resource = this.$resource('data.json', {}, customActions);
            this.resource.fetchData()
                .then(response => response.json())
                .then(data => {
                    this.orders = data ? data : [];
                });
            PaginationEvent.$on('vue-pagination::filteredOrders', page => {
                this.page = page;
            });
        }
    }

</script>

<style lang="scss">
    th {
        cursor: pointer;
    }

    .active {
        color: #337ab7;
        position: relative;
        
        &:after {
            content: '\2193';
            position: absolute;
            padding-left: 5px;
            top: 7px;
        }

        &.reverse {
            &:after {
                content: '\2191';
            }
        }
    }
</style>
