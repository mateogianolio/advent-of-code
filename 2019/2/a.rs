use std::io::{self, Read};

fn main() -> io::Result<()> {
  let mut input = String::new();
  let stdin = io::stdin();
  let mut handle = stdin.lock();

  handle.read_to_string(&mut input)?;

  let mut memory: Vec<usize> = input
    .split(",")
    .map(|x| x.parse::<usize>().unwrap())
    .collect();
  
  memory[1] = 12usize;
  memory[2] = 2usize;
  
  let mut i = 0usize;
  loop {
    let mut pos;
    let op = memory[i];
    match op {
      1 => {
        pos = memory[i + 1usize];
        let lhs = memory[pos];
        pos = memory[i + 2usize];
        let rhs = memory[pos];
        pos = memory[i + 3usize];
        memory[pos] = lhs + rhs;
        i += 4;
      },
      2 => {
        pos = memory[i + 1usize];
        let lhs = memory[pos];
        pos = memory[i + 2usize];
        let rhs = memory[pos];
        pos = memory[i + 3usize];
        memory[pos] = lhs * rhs;
        i += 4;
      },
      99 => break,
      _ => panic!("Something went wrong!"),
    }
  }

  println!("{}", memory[0]);

  Ok(())
}
