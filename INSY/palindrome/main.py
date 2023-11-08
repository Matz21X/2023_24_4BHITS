def is_palindrome(s):
    return s == s[::-1]

def find_longest_palindromes(filename):
    longest_palindromes = []
    max_length = 0

    with open(filename, 'r') as file:
        for line in file:
            line = line.strip()
            for i in range(len(line)):
                for j in range(i + max_length, len(line)):
                    substring = line[i:j+1]
                    if is_palindrome(substring):
                        if len(substring) > max_length:
                            max_length = len(substring)
                            longest_palindromes = [substring]
                        elif len(substring) == max_length:
                            longest_palindromes.append(substring)

    return longest_palindromes

filename = "palindrom_input.txt"
result = find_longest_palindromes(filename)

if result:
    for palindrome in result:
        print(palindrome)
else:
    print("No Palindrome")
