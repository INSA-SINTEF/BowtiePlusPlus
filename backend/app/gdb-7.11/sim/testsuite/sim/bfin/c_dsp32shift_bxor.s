//Original:/testcases/core/c_dsp32shift_bxor/c_dsp32shift_bxor.dsp
// Spec Reference: dsp32shift bxor
# mach: bfin

.include "testutils.inc"
	start

R0 = 0;
R1 = 58;
A0 = R1;
ASTAT = R0;


imm32 r0, 0x12345678;
imm32 r1, 0x22334455;
imm32 r2, 0x66778890;
imm32 r3, 0xaabbccdd;
imm32 r4, 0x34567890;
imm32 r5, 0xa2d3d5f6;
imm32 r6, 0x456bda06;
imm32 r7, 0x56789abc;
R0.L = CC = BXORSHIFT( A0 , R0 );
R1.L = CC = BXORSHIFT( A0 , R1 );
R2.L = CC = BXORSHIFT( A0 , R2 );
R3.L = CC = BXORSHIFT( A0 , R3 );
R4.L = CC = BXORSHIFT( A0 , R4 );
R5.L = CC = BXORSHIFT( A0 , R5 );
R6.L = CC = BXORSHIFT( A0 , R6 );
R7.L = CC = BXORSHIFT( A0 , R7 );
CHECKREG r0, 0x12340001;
CHECKREG r1, 0x22330001;
CHECKREG r2, 0x66770000;
CHECKREG r3, 0xAABB0001;
CHECKREG r4, 0x34560000;
CHECKREG r5, 0xA2D30000;
CHECKREG r6, 0x456B0000;
CHECKREG r7, 0x56780001;

imm32 r0, 0xa1001001;
imm32 r1, 0x1b001001;
imm32 r2, 0x11c01002;
imm32 r3, 0x110d1003;
imm32 r4, 0x1100e004;
imm32 r5, 0x11001f05;
imm32 r6, 0x11001006;
imm32 r7, 0x11001001;
R5.L = CC = BXORSHIFT( A0 , R0 );
R4.L = CC = BXORSHIFT( A0 , R1 );
R2.L = CC = BXORSHIFT( A0 , R2 );
R7.L = CC = BXORSHIFT( A0 , R3 );
R0.L = CC = BXORSHIFT( A0 , R4 );
R1.L = CC = BXORSHIFT( A0 , R5 );
R3.L = CC = BXORSHIFT( A0 , R6 );
R6.L = CC = BXORSHIFT( A0 , R7 );
CHECKREG r0, 0xA1000000;
CHECKREG r1, 0x1B000000;
CHECKREG r2, 0x11C00001;
CHECKREG r3, 0x110D0000;
CHECKREG r4, 0x11000000;
CHECKREG r5, 0x11000001;
CHECKREG r6, 0x11000000;
CHECKREG r7, 0x11000001;

imm32 r0, 0xa2001001;
imm32 r1, 0x1b341001;
imm32 r2, 0x71c01002;
imm32 r3, 0x810d1003;
imm32 r4, 0x1600e004;
imm32 r5, 0x41001405;
imm32 r6, 0x31003006;
imm32 r7, 0x21004671;
R2.L = CC = BXOR( A0 , R0 );
R3.L = CC = BXOR( A0 , R1 );
R5.L = CC = BXOR( A0 , R2 );
R6.L = CC = BXOR( A0 , R3 );
R0.L = CC = BXOR( A0 , R4 );
R1.L = CC = BXOR( A0 , R5 );
R7.L = CC = BXOR( A0 , R6 );
R4.L = CC = BXOR( A0 , R7 );
CHECKREG r0, 0xA2000000;
CHECKREG r1, 0x1B340000;
CHECKREG r2, 0x71C00000;
CHECKREG r3, 0x810D0000;
CHECKREG r4, 0x16000000;
CHECKREG r5, 0x41000000;
CHECKREG r6, 0x31000001;
CHECKREG r7, 0x21000000;

imm32 r0, 0x4a502001;
imm32 r1, 0x6b343001;
imm32 r2, 0x71c04002;
imm32 r3, 0x810d5003;
imm32 r4, 0x5600e004;
imm32 r5, 0x47001405;
imm32 r6, 0x91003006;
imm32 r7, 0xa1004671;
A1 = R3;
R0.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R1.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R2.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R3.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R4.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R5.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R6.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
R7.L = CC = BXOR( A0 , A1, CC );
A0 = BXORSHIFT( A0 , A1, CC );
CHECKREG r0, 0x4A500001;
CHECKREG r1, 0x6B340000;
CHECKREG r2, 0x71C00000;
CHECKREG r3, 0x810D0000;
CHECKREG r4, 0x56000001;
CHECKREG r5, 0x47000000;
CHECKREG r6, 0x91000001;
CHECKREG r7, 0xA1000001;




pass
