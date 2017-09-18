$(document).ready( function () {

    $('#example tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
    } );

    var table = $('#example').DataTable( {
        ajax: {
            url: 'http://keenthemes.com/metronic/preview/inc/api/datatables/demos/default.php',
            dataSrc: 'data'
        },
        columns: [
            { data: 'RecordID' },
            { data: 'OrderID' },
            { data: 'ShipCountry' },
            { data: 'ShipCity' },
            { data: 'Currency' },
            { data: 'ShipDate' },
            { data: 'Latitude' }
        ]
    } );

    table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
            if ( that.search() !== this.value ) {
                that
                    .search( this.value )
                    .draw();
            }
        });
    });

    $('#example tbody').on( 'click', 'tr', function () {
        $(this).toggleClass('selected');
    } );

    $('#delete').click( function () {
        $('.selected').each(function () {
            table.row(this).remove().draw( false );
        });

    } );


} );
