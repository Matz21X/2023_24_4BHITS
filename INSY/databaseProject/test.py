import requests
from tabulate import tabulate
import tkinter as tk
from tkinter import ttk, simpledialog, messagebox

# API-URLs für den Datenbankzugriff
api_urls = {
    'Users': 'http://localhost:3000/useraccounts',
    'Addresses': 'http://localhost:3000/addresses',
    'Products': 'http://localhost:3000/productcatalog',
    'Carts': 'http://localhost:3000/shoppingcart',
    'CartItems': 'http://localhost:3000/cartitems',
    'Orders': 'http://localhost:3000/orders',
    'OrderItems': 'http://localhost:3000/orderitems'  # Neuer Tab für die Tabelle "kunden"
}

def get_data_from_api(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Wirft eine Ausnahme bei einem HTTP-Fehlerstatuscode
        return response.json()  # Gibt die JSON-Daten der API-Antwort zurück
    except requests.exceptions.RequestException as e:
        print(f"Fehler bei der API-Anfrage: {e}")
        messagebox.showerror("Fehler", f"Fehler bei der API-Anfrage: {e}")
        return None

def display_table_on_tab(tab, api_url):
    def update_data():
        data = get_data_from_api(api_url)
        if data:
            tree.delete(*tree.get_children())  # Löscht vorhandene Daten im Treeview
            for row in data:
                tree.insert("", "end", values=list(row.values()))

    data = get_data_from_api(api_url)

    if data:
        headers = data[0].keys() if data else []

        tree = ttk.Treeview(tab, columns=headers, show="headings")
        for i, header in enumerate(headers):
            tree.heading(i, text=header)
            tree.column(i, width=100)

        for row in data:
            tree.insert("", "end", values=list(row.values()))

        tree.pack(expand=True, fill="both")

        # Button zum Aktualisieren der Daten hinzufügen
        update_button = ttk.Button(tab, text="Update", command=update_data)
        update_button.pack(pady=10)
    else:
        print(f"Keine Daten für Tabelle {tab} zum Anzeigen.")

def get_database_address():
    return simpledialog.askstring("Datenbankadresse", "Geben Sie die Adresse der Datenbank ein (default = localhost):")

def main():
    root = tk.Tk()
    root.title("Datenbank Tabellen")

    # Datenbankadresse abfragen
    database_address = get_database_address()

    # Falls keine Adresse eingegeben wurde, das Programm beenden
    if database_address:
        for key in api_urls:
            api_urls[key] = api_urls[key].replace("localhost", database_address)

        #root.destroy()
        #return


    # API-URLs mit der eingegebenen Datenbankadresse aktualisieren


    notebook = ttk.Notebook(root)

    for tab_name, api_url in api_urls.items():
        tab = ttk.Frame(notebook)
        notebook.add(tab, text=tab_name.capitalize())
        display_table_on_tab(tab, api_url)

    notebook.pack(expand=True, fill="both")
    root.mainloop()

if __name__ == "__main__":
    main()
