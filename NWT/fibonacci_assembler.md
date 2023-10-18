---
tags: []
---
NWT:

Fibonacci in C:
rsp = register for stack pointer
rbp = register for base	 pointer

rsp = wird bei jedem push geändert
rbp = wird bei jedem Methodenaufruf geändert, voriger Wert wird abgespeichert

Fibonacci.c

```
#include <stdio.h>

void fibonacci(void)
{
    int x, y, z;

    while (1) {
        x = 0;
        y = 1;

        do {
            printf("%d\n", x);

            z = x + y;
            x = y;
            y = z;
        }
        while(x < 255);
    }
}

int main(void)
{
    fibonacci();
    return 0;
}

assembler:
.LC0:
        .string "%d\n"
fibonacci:
        push    rbp
        mov     rbp, rsp
        sub     rsp, 16
.L3:
        mov     DWORD PTR [rbp-4], 0
        mov     DWORD PTR [rbp-8], 1
.L2:
        mov     eax, DWORD PTR [rbp-4]
        mov     esi, eax
        mov     edi, OFFSET FLAT:.LC0
        mov     eax, 0
        call    printf
        mov     edx, DWORD PTR [rbp-4]
        mov     eax, DWORD PTR [rbp-8]
        add     eax, edx
        mov     DWORD PTR [rbp-12], eax
        mov     eax, DWORD PTR [rbp-8]
        mov     DWORD PTR [rbp-4], eax
        mov     eax, DWORD PTR [rbp-12]
        mov     DWORD PTR [rbp-8], eax
        cmp     DWORD PTR [rbp-4], 254
        jle     .L2
        jmp     .L3
main:
        push    rbp
        mov     rbp, rsp
        call    fibonacci
        mov     eax, 0
        pop     rbp
        ret
```

#NWT