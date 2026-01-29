import zmq

context = zmq.Context()
socket = context.socket(zmq.PULL)
socket.connect("tcp://192.168.1.68:5555")

print("ZMQ receiver running...")

while True:
    data = socket.recv_json()
    print(f"Frame received: {data['frame_index']}")
