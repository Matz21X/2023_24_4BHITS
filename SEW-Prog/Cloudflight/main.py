def construct_withdrawals(currencies, amounts):
    for currency, amount_list in zip(currencies, amounts):
        for amount in amount_list:
            # Determine how many coins we need for this amount
            num_coins = amount // 2

            # Print the coins needed for this amount
            for _ in range(num_coins):
                print(currency, currency)

            # If the amount is odd, print one additional coin
            if amount % 2 != 0:
                print(currency)

# Example input
currencies = ['1', '5', '11', '18', '20']
amounts = [38, 19, 19, 25]


# Solve and print the withdrawals
construct_withdrawals(currencies, amounts)
