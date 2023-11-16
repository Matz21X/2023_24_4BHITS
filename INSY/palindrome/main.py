# defining a function which will check 
# if the string is palindrome or not
def is_palindrome(mystring):
    mystring = mystring.lower()
    reverse = mystring[::-1]
    print(reverse[1:len(reverse)-1])
    return mystring == reverse


def find_all_palindrome(filename):
    # opening the file
    with open(filename) as fp:
        # store the every word of the file in a list
        mylist = fp.read().split()
        print(mylist)  # this line is for our understanding
        # extracting all palindrome string
        mylist = list(filter(is_palindrome, mylist))
    return mylist


print(find_all_palindrome("palindrom_input.txt"))
