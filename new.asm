SECTION .DATA
    NUM1 DQ 5.0        ; First number (double-precision floating-point)
    NUM2 DQ 7.0        ; Second number (double-precision floating-point)
    RESULT DQ 0.0      ; Variable to store the result (double-precision floating-point)

SECTION .TEXT
    GLOBAL _START

_START:
    ; Load the values of NUM1 and NUM2 into XMM registers
    MOVSD XMM0, [NUM1]
    MOVSD XMM1, [NUM2]

    ; Add the values in XMM0 and XMM1 and store the result in XMM0
    ADDSD XMM0, XMM1

    ; Store the result in the variable 'RESULT'
    MOVSD [RESULT], XMM0

    ; Your program logic goes here

    ; Terminate the program
    MOV RAX, 60         ; System call number for exit
    XOR RDI, RDI        ; Exit code 0
    SYSCALL             ; Call kernel

SECTION .BSS
    ; Define uninitialized variables here, if needed
