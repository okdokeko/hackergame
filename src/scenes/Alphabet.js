// Point value is as follows:

//     1 point - A, E, I, O, U, L, N, S, T, R.
//     2 points - D, G.
//     3 points - B, C, M, P.
//     4 points - F, H, V, W, Y.
//     5 points - K.
//     8 points - J, X.
//     10 points - Q, Z.

class Letter {
    constructor(character, score) {
        this.character = character;
        this.score = score;
    }
}

class A extends Letter {
    constructor() {
        super('A', 1);
    }
}

class E extends Letter {
    constructor() {
        super('E', 1);
    }
}

class I extends Letter {
    constructor() {
        super('I', 1);
    }
}

class O extends Letter {
    constructor() {
        super('O', 1);
    }
}

class U extends Letter {
    constructor() {
        super('U', 1);
    }
}

class L extends Letter {
    constructor() {
        super('L', 1);
    }
}

class N extends Letter {
    constructor() {
        super('N', 1);
    }
}

class S extends Letter {
    constructor() {
        super('S', 1);
    }
}

class T extends Letter {
    constructor() {
        super('T', 1);
    }
}

class R extends Letter {
    constructor() {
        super('R', 1);
    }
}

class D extends Letter {
    constructor() {
        super('D', 2);
    }
}

class G extends Letter {
    constructor() {
        super('G', 2);
    }
}

class B extends Letter {
    constructor() {
        super('B', 3);
    }
}

class C extends Letter {
    constructor() {
        super('C', 3);
    }
}

class M extends Letter {
    constructor() {

        super('M', 3);
    }
}

class P extends Letter {
    constructor() {
        super('P', 3);
    }
}

class F extends Letter {
    constructor() {
        super('F', 4);
    }
}

class H extends Letter {
    constructor() {
        super('H', 4);
    }
}

class V extends Letter {
    constructor() {
        super('V', 4);
    }
}

class W extends Letter {
    constructor() {
        super('W', 4);
    }
}

class Y extends Letter {
    constructor() {
        super('Y', 4);
    }
}

class K extends Letter {
    constructor() {
        super('K', 5);
    }
}

class J extends Letter {
    constructor() {
        super('J', 8);
    }
}

class X extends Letter {
    constructor() {
        super('X', 8);
    }
}

class Q extends Letter {
    constructor() {
        super('Q', 10);
    }
}

class Z extends Letter {
    constructor() {
        super('Z', 10);
    }
}