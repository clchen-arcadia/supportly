def get_form_errors(form):
    messages = []
    for err in form.errors:
        joined_messages = " ".join(form.errors[err])
        messages.append(f"{err}: {joined_messages}")

    return messages


def send_ticket_dummy_email(ticket, response):
    print("SENDING EMAIL", flush=True)
    print("==========================================", flush=True)
    print("mailto: ", ticket.client_email, flush=True)
    print("subject: ", f"Regarding ticket: {ticket.id}", flush=True)
    print("body: ", f"Dear {ticket.client_name}. {response}", flush=True)
