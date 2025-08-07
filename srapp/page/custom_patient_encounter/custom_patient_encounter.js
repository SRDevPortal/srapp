frappe.pages['custom-patient-encounter'].on_page_load = function(wrapper) {
    const page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Custom Patient Encounter',
        single_column: true
    });

    $(page.body).html(`<div id="encounter-container">Loading...</div>`);

    frappe.call({
        method: "frappe.client.get_list",
        args: {
            doctype: "Patient Encounter",
            fields: ["name", "patient", "encounter_date", "practitioner", "mobile"],
            limit_page_length: 20,
            order_by: "modified desc"
        },
        callback: function(r) {
            if (r.message) {
                const html = r.message.map(enc => `
                    <div class="card" style="margin: 10px 0; padding: 10px;">
                        <b>Encounter:</b> ${enc.name} (${frappe.datetime.str_to_user(enc.encounter_date)})<br>
                        <b>Patient:</b> ${enc.patient}<br>
                        <b>Mobile:</b> ${enc.mobile || "-"}<br>
                        <b>Practitioner:</b> ${enc.practitioner || "-"}
                    </div>
                `).join('');
                $('#encounter-container').html(html);
            }
        }
    });
};

